// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Delete existing data in the correct order
  await prisma.session.deleteMany()
  await prisma.report.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.user.deleteMany()
  await prisma.permission.deleteMany()
  await prisma.role.deleteMany()
  await prisma.widget.deleteMany()

  // Create permissions
  const readPermission = await prisma.permission.create({
    data: { name: 'READ' },
  })
  const writePermission = await prisma.permission.create({
    data: { name: 'WRITE' },
  })
  const deletePermission = await prisma.permission.create({
    data: { name: 'DELETE' },
  })
  const updatePermission = await prisma.permission.create({
    data: { name: 'UPDATE' },
  })

  // Create roles with permissions
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
      permissions: {
        connect: [
          { id: readPermission.id },
          { id: writePermission.id },
          { id: deletePermission.id },
          { id: updatePermission.id },
        ],
      },
    },
  })

  const managerRole = await prisma.role.create({
    data: {
      name: 'MANAGER',
      permissions: {
        connect: [
          { id: readPermission.id },
          { id: writePermission.id },
          { id: updatePermission.id },
        ],
      },
    },
  })

  const staffRole = await prisma.role.create({
    data: {
      name: 'STAFF',
      permissions: {
        connect: [
          { id: readPermission.id },
          { id: writePermission.id },
        ],
      },
    },
  })

  const clientRole = await prisma.role.create({
    data: {
      name: 'CLIENT',
      permissions: {
        connect: [
          { id: readPermission.id },
        ],
      },
    },
  })

  // Create users with hierarchy
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: await bcrypt.hash('admin123', 10),
      role: {
        connect: { id: adminRole.id },
      },
      profile: {
        create: {
          bio: 'System Administrator',
          avatarUrl: 'https://example.com/avatar/admin.png',
        },
      },
    },
  })

  const managerUser = await prisma.user.create({
    data: {
      email: 'manager@example.com',
      name: 'Manager User',
      password: await bcrypt.hash('manager123', 10),
      role: {
        connect: { id: managerRole.id },
      },
      profile: {
        create: {
          bio: 'Department Manager',
          avatarUrl: 'https://example.com/avatar/manager.png',
        },
      },
    },
  })

  const staffUser = await prisma.user.create({
    data: {
      email: 'staff@example.com',
      name: 'Staff User',
      password: await bcrypt.hash('staff123', 10),
      role: {
        connect: { id: staffRole.id },
      },
      profile: {
        create: {
          bio: 'Staff Member',
          avatarUrl: 'https://example.com/avatar/staff.png',
        },
      },
    },
  })

  const clientUser = await prisma.user.create({
    data: {
      email: 'client@example.com',
      name: 'Client User',
      password: await bcrypt.hash('client123', 10),
      role: {
        connect: { id: clientRole.id },
      },
      profile: {
        create: {
          bio: 'Client',
          avatarUrl: 'https://example.com/avatar/client.png',
        },
      },
    },
  })

  // Create sample reports
  await prisma.report.create({
    data: {
      title: 'Monthly Progress Report',
      content: 'Detailed analysis of monthly progress...',
      status: 'PENDING',
      createdBy: { connect: { id: staffUser.id } },
      assignedTo: { connect: { id: managerUser.id } },
    },
  })

  await prisma.report.create({
    data: {
      title: 'Client Requirements',
      content: 'New client project requirements...',
      status: 'IN_PROGRESS',
      createdBy: { connect: { id: clientUser.id } },
      assignedTo: { connect: { id: staffUser.id } },
    },
  })

  // Create widgets
  await prisma.widget.createMany({
    data: [
      {
        name: 'Weather Widget',
        type: 'WEATHER',
        configuration: JSON.stringify({
          location: 'Jakarta',
          units: 'metric',
        }),
      },
      {
        name: 'News Widget',
        type: 'NEWS',
        configuration: JSON.stringify({
          category: 'technology',
        }),
      },
      {
        name: 'Stocks Widget',
        type: 'STOCKS',
        configuration: JSON.stringify({
          market: 'NYSE',
        }),
      },
    ],
  })

  console.log('Database seeded successfully with updated roles and permissions.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
