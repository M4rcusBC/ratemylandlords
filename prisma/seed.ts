import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with sample data...');

  // Create sample landlords
  const landlord1 = await prisma.landlord.create({
    data: {
      name: 'Green Valley Properties',
      address: '123 Main Street',
      city: 'Springfield',
      state: 'CA',
      zipCode: '90210',
      phone: '(555) 123-4567',
      email: 'info@greenvalleyproperties.com',
      website: 'https://greenvalleyproperties.com',
      description: 'Professional property management company serving the Springfield area for over 20 years.',
    },
  });

  const landlord2 = await prisma.landlord.create({
    data: {
      name: 'Metro Apartments LLC',
      address: '456 Oak Avenue',
      city: 'Springfield',
      state: 'CA',
      zipCode: '90211',
      phone: '(555) 987-6543',
      email: 'contact@metroapartments.com',
      description: 'Modern apartment complexes with amenities in prime locations.',
    },
  });

  const landlord3 = await prisma.landlord.create({
    data: {
      name: 'Sunset Rentals',
      address: '789 Pine Road',
      city: 'Springfield',
      state: 'CA',
      zipCode: '90212',
      phone: '(555) 555-0123',
      description: 'Family-owned rental properties with a personal touch.',
    },
  });

  // Create sample reviews
  await prisma.review.create({
    data: {
      landlordId: landlord1.id,
      userId: 'sample-user-1',
      rating: 5,
      title: 'Excellent landlord, highly recommended!',
      content: 'Green Valley Properties has been fantastic to work with. They respond quickly to maintenance requests and the properties are well-maintained. I\'ve been renting from them for 2 years and have never had any issues.',
      anonymous: true,
    },
  });

  await prisma.review.create({
    data: {
      landlordId: landlord1.id,
      userId: 'sample-user-2',
      rating: 4,
      title: 'Good experience overall',
      content: 'Professional management company with fair pricing. The only downside is that it can sometimes take a day or two to get responses to non-urgent requests.',
      anonymous: true,
    },
  });

  await prisma.review.create({
    data: {
      landlordId: landlord2.id,
      userId: 'sample-user-3',
      rating: 3,
      title: 'Average experience',
      content: 'The apartments are nice but the management can be unresponsive at times. Had to wait over a week for a maintenance issue to be addressed.',
      anonymous: true,
    },
  });

  await prisma.review.create({
    data: {
      landlordId: landlord2.id,
      userId: 'sample-user-4',
      rating: 2,
      title: 'Poor communication',
      content: 'Very difficult to reach the management office. When I moved out, it took months to get my security deposit back.',
      anonymous: true,
    },
  });

  await prisma.review.create({
    data: {
      landlordId: landlord3.id,
      userId: 'sample-user-5',
      rating: 5,
      title: 'Amazing landlord!',
      content: 'The owners are incredibly kind and responsive. They truly care about their tenants and maintain the properties excellently. Rent is also very reasonable.',
      anonymous: true,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created ${await prisma.landlord.count()} landlords`);
  console.log(`📊 Created ${await prisma.review.count()} reviews`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });