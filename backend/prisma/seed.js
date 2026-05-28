const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Users
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.createMany({
    data: [
      { email: 'admin@haqms.com', password: hashedPassword, name: 'Admin User', role: 'ADMIN' },
      { email: 'reception1@haqms.com', password: hashedPassword, name: 'Reception One', role: 'RECEPTIONIST' },
      { email: 'doctor1@haqms.com', password: hashedPassword, name: 'Dr. John Smith', role: 'DOCTOR' },
    ],
    skipDuplicates: true,
  });

  // Create Doctors
  await prisma.doctor.createMany({
    data: [
      { name: 'Dr. John Smith', email: 'doctor1@haqms.com', specialization: 'Cardiology', department: 'Surgery', experience: 10, consultationFee: 500, availableFrom: '09:00', availableTo: '17:00' },
      { name: 'Dr. Jane Doe', email: 'doctor2@haqms.com', specialization: 'Neurology', department: 'Neurology', experience: 8, consultationFee: 600, availableFrom: '10:00', availableTo: '18:00' },
      { name: 'Dr. Bruce Banner', email: 'doctor3@haqms.com', specialization: 'Orthopedics', department: 'Surgery', experience: 12, consultationFee: 450, availableFrom: '08:00', availableTo: '16:00' },
    ],
    skipDuplicates: true,
  });

  // Create Patients
  await prisma.patient.createMany({
    data: [
      { name: 'Clark Kent', phoneNumber: '9876543210', age: 30, gender: 'Male', medicalHistory: null },
      { name: 'Bruce Wayne', phoneNumber: '9876543211', age: 35, gender: 'Male', medicalHistory: null },
      { name: 'Diana Prince', phoneNumber: '9876543212', age: 28, gender: 'Female', medicalHistory: 'Allergic to penicillin' },
      { name: 'Peter Parker', phoneNumber: '9876543213', age: 22, gender: 'Male', medicalHistory: 'Asthma' },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });