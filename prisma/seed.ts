// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Delete existing data in the correct order to respect foreign key constraints
  await prisma.contract.deleteMany()
  await prisma.schedule.deleteMany()
  await prisma.progress.deleteMany()
  await prisma.budget.deleteMany()
  await prisma.site.deleteMany()
  await prisma.review.deleteMany()
  await prisma.prototype.deleteMany()
  await prisma.mockup.deleteMany()
  await prisma.template.deleteMany()
  await prisma.wireframe.deleteMany()
  await prisma.feedback.deleteMany()
  await prisma.announcement.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.session.deleteMany()
  await prisma.report.deleteMany()
  await prisma.widget.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.user.deleteMany()
  await prisma.permission.deleteMany()
  await prisma.role.deleteMany()

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

  // Create announcements
  await prisma.announcement.createMany({
    data: [
      {
        title: 'System Maintenance',
        date: new Date('2024-02-20'),
        content: 'Scheduled maintenance will be performed on the system this weekend.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'New Feature Release',
        date: new Date('2024-02-18'),
        content: "We're excited to announce the release of new project management features.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Holiday Schedule',
        date: new Date('2024-02-15'),
        content: 'Please note the upcoming holiday schedule for the next month.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  // Create feedbacks
  await prisma.feedback.createMany({
    data: [
      {
        userId: staffUser.id,
        feedbackText: 'Great system! Very user-friendly.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: clientUser.id,
        feedbackText: 'Could use more customization options.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  // Create notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: adminUser.id,
        type: 'SYSTEM',
        title: 'Welcome to the Dashboard',
        description: 'Your admin account has been created successfully.',
        time: new Date(),
        read: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: managerUser.id,
        type: 'REPORT',
        title: 'New Report Assigned',
        description: 'You have been assigned a new progress report.',
        time: new Date(),
        read: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: staffUser.id,
        type: 'MESSAGE',
        title: 'New Message from Manager',
        description: 'Please review the latest project updates.',
        time: new Date(),
        read: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  // Create mockups
  await prisma.mockup.createMany({
    data: [
      {
        title: 'Dashboard Layout',
        description: 'Modern admin dashboard interface with dark mode support',
        image: 'photo-1486312338219-ce68d2c6f44d',
        category: 'Web App',
        stars: 245,
        downloads: 1234,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Interface',
        description: 'Clean and minimal mobile application design',
        image: 'photo-1488590528505-98d2b5aba04b',
        category: 'Mobile',
        stars: 187,
        downloads: 856,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'E-commerce Platform',
        description: 'Full-featured online store template',
        image: 'photo-1461749280684-dccba630e2f6',
        category: 'E-commerce',
        stars: 312,
        downloads: 2156,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Analytics Dashboard',
        description: 'Data visualization and reporting interface',
        image: 'photo-1581091226825-a6a2a5aee158',
        category: 'Analytics',
        stars: 156,
        downloads: 945,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Social Media App',
        description: 'Modern social networking interface',
        image: 'photo-1487058792275-0ad4aaf24ca7',
        category: 'Social',
        stars: 289,
        downloads: 1567,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Project Management',
        description: 'Task and project tracking system',
        image: 'photo-1498050108023-c5249f4df085',
        category: 'Management',
        stars: 198,
        downloads: 1089,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  // Create prototypes
  await prisma.prototype.createMany({
    data: [
      {
        title: 'User Flow Prototype',
        description: 'Interactive user journey demonstration with key touchpoints and interactions.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Animation Prototype',
        description: 'Motion design concepts and transition animations between states.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Navigation Prototype',
        description: 'Menu systems and navigation patterns with interactive elements.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  // Create reviews
  await prisma.review.createMany({
    data: [
      {
        title: 'Pending Reviews',
        description: 'Design work awaiting review and feedback from stakeholders.',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Review History',
        description: 'Past design reviews with comments and revision history.',
        status: 'COMPLETED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Review Metrics',
        description: 'Statistics and insights from design review processes.',
        status: 'ANALYZING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  // Create templates
  await prisma.template.createMany({
    data: [
      {
        type: 'Page',
        name: 'Landing Page Template',
        content: '<html><body>Landing Page</body></html>',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Email',
        name: 'Welcome Email Template',
        content: 'Welcome to our platform!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Document',
        name: 'Project Proposal Template',
        content: 'Project Proposal Content',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  // Create wireframes
  await prisma.wireframe.createMany({
    data: [
      {
        title: 'Homepage Wireframe',
        status: 'IN_PROGRESS',
        lastModified: new Date('2024-03-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Dashboard Layout',
        status: 'COMPLETED',
        lastModified: new Date('2024-03-14'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'User Profile Page',
        status: 'IN_REVIEW',
        lastModified: new Date('2024-03-13'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Settings Interface',
        status: 'PLANNED',
        lastModified: new Date('2024-03-12'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile Navigation',
        status: 'IN_PROGRESS',
        lastModified: new Date('2024-03-11'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Authentication Flows',
        status: 'COMPLETED',
        lastModified: new Date('2024-03-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  // Create sites
  const sites = await prisma.site.createMany({
    data: [
      {
        name: 'Downtown Plaza Project',
        location: '123 Main St, Downtown',
        status: 'active',
        startDate: new Date('2024-01-15'),
        teamSize: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Riverside Apartments',
        location: '456 River Road',
        status: 'planning',
        startDate: new Date('2024-03-01'),
        teamSize: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tech Park Development',
        location: '789 Innovation Drive',
        status: 'active',
        startDate: new Date('2024-02-10'),
        teamSize: 32,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })

  // Fetch all sites to use their IDs
  const allSites = await prisma.site.findMany()

  // Create budgets
  await prisma.budget.createMany({
    data: allSites.map(site => ({
      siteId: site.id,
      totalBudget: 100000 + Math.floor(Math.random() * 50000), // Random budgets
      expenses: 50000 + Math.floor(Math.random() * 40000),
      remaining: 100000 + Math.floor(Math.random() * 50000) - (50000 + Math.floor(Math.random() * 40000)),
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  })

  // Create progress entries
  await prisma.progress.createMany({
    data: allSites.flatMap(site => [
      {
        siteId: site.id,
        progress: Math.floor(Math.random() * 100),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        siteId: site.id,
        progress: Math.floor(Math.random() * 100),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  })

  // Create schedules
  await prisma.schedule.createMany({
    data: allSites.flatMap(site => [
      {
        siteId: site.id,
        date: new Date('2024-04-01'),
        description: 'Foundation work starts',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        siteId: site.id,
        date: new Date('2024-06-15'),
        description: 'Framing completion',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  })

  // Create contracts
  await prisma.contract.createMany({
    data: allSites.flatMap(site => [
      {
        name: `${site.name} Contract A`,
        document: `https://example.com/contracts/${site.name}-A.pdf`,
        siteId: site.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: `${site.name} Contract B`,
        document: `https://example.com/contracts/${site.name}-B.pdf`,
        siteId: site.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  })

  console.log('Database seeded successfully with updated roles, permissions, and new models.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
