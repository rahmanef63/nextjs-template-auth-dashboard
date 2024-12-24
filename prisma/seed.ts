// prisma/seed.ts

import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Delete existing data in the correct order
  await prisma.session.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.user.deleteMany()
  await prisma.permission.deleteMany()
  await prisma.role.deleteMany()
  await prisma.widget.deleteMany()

  // Buat permissions
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

  // Buat roles dan hubungkan dengan permissions
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

  const userRole = await prisma.role.create({
    data: {
      name: 'USER',
      permissions: {
        connect: [{ id: readPermission.id }, { id: writePermission.id }],
      },
    },
  })

  const moderatorRole = await prisma.role.create({
    data: {
      name: 'MODERATOR',
      permissions: {
        connect: [
          { id: readPermission.id },
          { id: updatePermission.id },
        ],
      },
    },
  })

  // Buat pengguna
  const hashedPasswordAdmin = await bcrypt.hash('adminpassword', 10)
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPasswordAdmin,
      roleId: adminRole.id,
      profile: {
        create: {
          bio: 'I am the admin',
          avatarUrl: 'https://example.com/avatar/admin.png',
        },
      },
    },
  })

  const hashedPasswordUser = await bcrypt.hash('userpassword', 10)
  const normalUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Normal User',
      password: hashedPasswordUser,
      roleId: userRole.id,
      profile: {
        create: {
          bio: 'I am a regular user',
          avatarUrl: 'https://example.com/avatar/user.png',
        },
      },
    },
  })

  // Buat sesi (contoh)
  await prisma.session.create({
    data: {
      sessionId: 'session123',
      userId: adminUser.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 jam dari sekarang
    },
  })

  // Buat widgets
  await prisma.widget.createMany({
    data: [
      {
        name: 'Weather Widget',
        type: 'WEATHER',
        configuration: {
          location: 'Jakarta',
          units: 'metric',
        },
      },
      {
        name: 'News Widget',
        type: 'NEWS',
        configuration: {
          category: 'technology',
        },
      },
      {
        name: 'Stocks Widget',
        type: 'STOCKS',
        configuration: {
          market: 'NYSE',
        },
      },
    ],
  })

  console.log('Database telah di-seed dengan data awal yang diperbarui.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
