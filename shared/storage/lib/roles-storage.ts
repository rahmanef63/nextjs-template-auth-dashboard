import { Role, RoleAssignment } from 'shared/types';
import { ADMINISTRATOR_ROLE } from '../constants/roles-storage-constants';

const ROLES_KEY = 'system_roles';
const ROLE_ASSIGNMENTS_KEY = 'role_assignments';

// Initialize storage with administrator role
function initializeRolesStorage() {
  const existingRoles = getRoles();
  if (!existingRoles.length) {
    saveRoles([ADMINISTRATOR_ROLE]);
  }
}

// Role CRUD operations
export function getRoles(): Role[] {
  try {
    const roles = localStorage.getItem(ROLES_KEY);
    return roles ? JSON.parse(roles) : [];
  } catch (error) {
    console.error('Error reading roles:', error);
    return [];
  }
}

export function saveRoles(roles: Role[]): void {
  try {
    localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  } catch (error) {
    console.error('Error saving roles:', error);
  }
}

export function createRole(role: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Role {
  const roles = getRoles();
  
  // Check if role name already exists
  if (roles.some(r => r.name.toLowerCase() === role.name.toLowerCase())) {
    throw new Error('Role name already exists');
  }

  const newRole: Role = {
    ...role,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveRoles([...roles, newRole]);
  return newRole;
}

export function updateRole(id: string, updates: Partial<Role>): Role {
  const roles = getRoles();
  const roleIndex = roles.findIndex(r => r.id === id);
  
  if (roleIndex === -1) {
    throw new Error('Role not found');
  }

  // Prevent modification of system roles
  if (roles[roleIndex].isSystem) {
    throw new Error('Cannot modify system roles');
  }

  // Check name uniqueness if name is being updated
  if (updates.name && roles.some(r => 
    r.id !== id && r.name.toLowerCase() === updates.name?.toLowerCase()
  )) {
    throw new Error('Role name already exists');
  }

  const updatedRole: Role = {
    ...roles[roleIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  roles[roleIndex] = updatedRole;
  saveRoles(roles);
  return updatedRole;
}

export function deleteRole(id: string): void {
  const roles = getRoles();
  const role = roles.find(r => r.id === id);
  
  if (!role) {
    throw new Error('Role not found');
  }

  if (role.isSystem) {
    throw new Error('Cannot delete system roles');
  }

  // Check if role is assigned to any users
  const assignments = getRoleAssignments();
  if (assignments.some(a => a.roleId === id)) {
    throw new Error('Cannot delete role that is assigned to users');
  }

  saveRoles(roles.filter(r => r.id !== id));
}

// Role assignments
export function getRoleAssignments(): RoleAssignment[] {
  try {
    const assignments = localStorage.getItem(ROLE_ASSIGNMENTS_KEY);
    return assignments ? JSON.parse(assignments) : [];
  } catch (error) {
    console.error('Error reading role assignments:', error);
    return [];
  }
}

export function assignRole(userId: string, roleId: string): void {
  const assignments = getRoleAssignments();
  
  // Remove existing assignment if any
  const filteredAssignments = assignments.filter(a => a.userId !== userId);
  
  const newAssignment: RoleAssignment = {
    userId,
    roleId,
    assignedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    ROLE_ASSIGNMENTS_KEY, 
    JSON.stringify([...filteredAssignments, newAssignment])
  );
}

// Initialize storage
if (typeof window !== 'undefined') {
  initializeRolesStorage();
}