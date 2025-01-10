import { Role, RoleAssignment, RoleType } from '@/shared/permission/types/rbac-types';
import { 
  SUPER_ADMIN_ROLE,
  ADMIN_ROLE,
  POWER_USER_ROLE,
  STANDARD_ROLE,
  RESTRICTED_ROLE
} from '../constants/roles-storage-constants';

const ROLES_KEY = 'system_roles';
const ROLE_ASSIGNMENTS_KEY = 'role_assignments';

// Initialize storage with default roles
function initializeRolesStorage() {
  const existingRoles = getRoles();
  if (!existingRoles.length) {
    saveRoles([
      SUPER_ADMIN_ROLE,
      ADMIN_ROLE,
      POWER_USER_ROLE,
      STANDARD_ROLE,
      RESTRICTED_ROLE
    ]);
  }
}

// Role CRUD operations
export function getRoles(): Role[] {
  try {
    const rolesJson = localStorage.getItem(ROLES_KEY);
    if (!rolesJson) return [];

    const roles = JSON.parse(rolesJson);
    return roles.map((role: any) => ({
      ...role,
      createdAt: new Date(role.createdAt),
      updatedAt: new Date(role.updatedAt),
    }));
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
  
  const now = new Date();
  
  const newRole: Role = {
    ...role,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    restrictions: role.restrictions || [] // Initialize with empty restrictions if not provided
  };
  
  roles.push(newRole);
  saveRoles(roles);
  return newRole;
}

export function updateRole(id: string, updates: Partial<Role>): Role {
  const roles = getRoles();
  const roleIndex = roles.findIndex(r => r.id === id);
  
  if (roleIndex === -1) {
    throw new Error(`Role with id ${id} not found`);
  }
  
  // Don't allow updating system roles
  if (roles[roleIndex].isSystem) {
    throw new Error('Cannot modify system roles');
  }
  
  const updatedRole: Role = {
    ...roles[roleIndex],
    ...updates,
    updatedAt: new Date(),
  };
  
  roles[roleIndex] = updatedRole;
  saveRoles(roles);
  return updatedRole;
}

export function deleteRole(id: string): void {
  const roles = getRoles();
  const role = roles.find(r => r.id === id);
  
  if (!role) {
    throw new Error(`Role with id ${id} not found`);
  }
  
  // Don't allow deleting system roles
  if (role.isSystem) {
    throw new Error('Cannot delete system roles');
  }
  
  const filteredRoles = roles.filter(r => r.id !== id);
  saveRoles(filteredRoles);
  
  // Clean up role assignments
  const assignments = getRoleAssignments();
  const filteredAssignments = assignments.filter(a => a.roleId !== id);
  saveRoleAssignments(filteredAssignments);
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

function saveRoleAssignments(assignments: RoleAssignment[]): void {
  try {
    localStorage.setItem(ROLE_ASSIGNMENTS_KEY, JSON.stringify(assignments));
  } catch (error) {
    console.error('Error saving role assignments:', error);
  }
}

export function assignRole(userId: string, roleId: string): void {
  const roles = getRoles();
  if (!roles.find(r => r.id === roleId)) {
    throw new Error(`Role with id ${roleId} not found`);
  }
  
  const assignments = getRoleAssignments();
  const existingAssignment = assignments.find(a => a.userId === userId);
  
  if (existingAssignment) {
    existingAssignment.roleId = roleId;
    existingAssignment.assignedAt = new Date().toISOString();
  } else {
    assignments.push({
      userId,
      roleId,
      assignedAt: new Date().toISOString()
    });
  }
  
  saveRoleAssignments(assignments);
}

// Initialize storage
if (typeof window !== 'undefined') {
  initializeRolesStorage();
}