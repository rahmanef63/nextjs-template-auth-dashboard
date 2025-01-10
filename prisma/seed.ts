// prisma/seed.ts

import { PrismaClient, RoleType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting seeding...');

    // Check if data already exists
    const existingRoles = await prisma.role.findMany();
    if (existingRoles.length > 0) {
      console.log('Data already exists, skipping seed...');
      return;
    }

    console.log('No existing data found, starting fresh seed...');

    // Create base permissions
    console.log('Creating base permissions...');
    const permissions = await Promise.all([
      prisma.permission.create({
        data: { 
          name: 'all:create',
          resource: 'all',
          action: 'create'
        }
      }),
      prisma.permission.create({
        data: { 
          name: 'all:read',
          resource: 'all',
          action: 'read'
        }
      }),
      prisma.permission.create({
        data: { 
          name: 'all:update',
          resource: 'all',
          action: 'update'
        }
      }),
      prisma.permission.create({
        data: { 
          name: 'all:delete',
          resource: 'all',
          action: 'delete'
        }
      }),
      prisma.permission.create({
        data: { 
          name: 'users:create',
          resource: 'users',
          action: 'create'
        }
      }),
      prisma.permission.create({
        data: { 
          name: 'users:read',
          resource: 'users',
          action: 'read'
        }
      }),
      prisma.permission.create({
        data: { 
          name: 'users:update',
          resource: 'users',
          action: 'update'
        }
      }),
      prisma.permission.create({
        data: { 
          name: 'users:delete',
          resource: 'users',
          action: 'delete'
        }
      })
    ]);

    // Create roles with permissions
    console.log('Creating roles...');
    const superAdminRole = await prisma.role.create({
      data: {
        name: 'SUPER_ADMIN',
        type: 'SUPER_ADMIN',
        description: 'Complete system access with ability to manage other admins',
        isSystem: true,
        permissions: {
          connect: permissions.map(p => ({ id: p.id }))
        }
      }
    });

    const adminRole = await prisma.role.create({
      data: {
        name: 'ADMIN',
        type: 'ADMIN',
        description: 'Administrative access to manage users and roles',
        isSystem: true,
        permissions: {
          connect: permissions.filter(p => 
            p.name.startsWith('users:')
          ).map(p => ({ id: p.id }))
        }
      }
    });

    const powerUserRole = await prisma.role.create({
      data: {
        name: 'POWER_USER',
        type: 'POWER_USER',
        description: 'Enhanced access with ability to manage resources',
        isSystem: true,
        permissions: {
          connect: permissions.filter(p => 
            p.name === 'users:read'
          ).map(p => ({ id: p.id }))
        }
      }
    });

    const standardRole = await prisma.role.create({
      data: {
        name: 'STANDARD',
        type: 'STANDARD',
        description: 'Regular access with standard permissions',
        isSystem: true,
        permissions: {
          connect: permissions.filter(p => 
            p.name === 'users:read'
          ).map(p => ({ id: p.id }))
        }
      }
    });

    const restrictedRole = await prisma.role.create({
      data: {
        name: 'RESTRICTED',
        type: 'RESTRICTED',
        description: 'Limited access with specific restrictions',
        isSystem: true,
        permissions: {
          connect: permissions.filter(p => 
            p.name === 'users:read'
          ).map(p => ({ id: p.id }))
        }
      }
    });

    // Create users
    console.log('Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    await prisma.user.create({
      data: {
        email: 'superadmin@example.com',
        name: 'Super Admin',
        password: hashedPassword,
        roleId: superAdminRole.id
      }
    });

    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: hashedPassword,
        roleId: adminRole.id
      }
    });

    await prisma.user.create({
      data: {
        email: 'poweruser@example.com',
        name: 'Power User',
        password: hashedPassword,
        roleId: powerUserRole.id
      }
    });

    await prisma.user.create({
      data: {
        email: 'standard@example.com',
        name: 'Standard User',
        password: hashedPassword,
        roleId: standardRole.id
      }
    });

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
