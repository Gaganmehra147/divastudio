import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const categoryCount = await prisma.category.count();
  if (categoryCount > 0 && process.env.FORCE_SEED !== 'true') {
    console.log('Database already has data. Skipping seed.');
    return;
  }
  console.log('Seeding DIVASTUDIO database with luxury royal Indian wedding assets...');

  // Clean existing records
  await prisma.projectImage.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.packageAddon.deleteMany({});
  await prisma.package.deleteMany({});
  await prisma.albumPrint.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.faq.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.enquiry.deleteMany({});
  await prisma.photographerProfile.deleteMany({});
  await prisma.studioInfo.deleteMany({});
  await prisma.siteSetting.deleteMany({});
  await prisma.adminUser.deleteMany({});

  // 1. Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.create({
    data: {
      email: 'admin@divastudio.com',
      passwordHash,
      name: 'Creative Director',
      role: 'SUPERADMIN',
    },
  });

  // 2. Categories with Royal Indian Wedding Imagery
  const catWeddings = await prisma.category.create({
    data: {
      name: 'Royal Weddings & Varmala',
      slug: 'weddings',
      description: 'Grand palace celebrations, royal varmala moments, and sacred pheras captured with cinematic intimacy.',
      coverImage: '/images/cat_royal_weddings.jpg',
      order: 1,
      isFeatured: true,
      seoTitle: 'Luxury Indian Wedding Photography | DIVASTUDIO',
      seoDescription: 'Award-winning destination Indian wedding photographers documenting royal celebrations worldwide.',
    },
  });

  const catPortraits = await prisma.category.create({
    data: {
      name: 'Royal Bridal Portraits',
      slug: 'portraits',
      description: 'Intimate, museum-grade bridal portraiture highlighting handcrafted zardozi lehengas and polki jewellery.',
      coverImage: '/images/cat_bridal_portrait.jpg',
      order: 2,
      isFeatured: true,
      seoTitle: 'Royal Indian Bridal Portraiture | DIVASTUDIO',
      seoDescription: 'Editorial Indian bridal portraits inspired by timeless royal heritage.',
    },
  });

  const catHaldi = await prisma.category.create({
    data: {
      name: 'Haldi, Mehendi & Sangeet',
      slug: 'haldi-mehendi',
      description: 'Joyous, unposed explosions of yellow marigolds, pure laughter, and ecstatic celebratory revelry.',
      coverImage: '/images/cat_haldi_mehendi.jpg',
      order: 3,
      isFeatured: true,
      seoTitle: 'Haldi & Sangeet Candid Photography | DIVASTUDIO',
      seoDescription: 'Candid and emotional pre-wedding ceremonies documented with vibrant life.',
    },
  });

  const catPrewedding = await prisma.category.create({
    data: {
      name: 'Destination & Palaces',
      slug: 'pre-wedding',
      description: 'Poetic couple narratives amidst Udaipur marble jharokhas, Jaipur fortresses, and sunset waters.',
      coverImage: '/images/cat_prewedding_palace.jpg',
      order: 4,
      isFeatured: true,
      seoTitle: 'Destination Indian Pre-Wedding Photography | DIVASTUDIO',
      seoDescription: 'Pre-wedding couple storytelling across heritage palaces and global destinations.',
    },
  });

  const catMaternity = await prisma.category.create({
    data: {
      name: 'Maternity & Motherhood',
      slug: 'maternity',
      description: 'Ethereal, sculptural tributes honoring maternal grace in handwoven silk sarees and golden light.',
      coverImage: '/images/cat_maternity_saree.jpg',
      order: 5,
      isFeatured: true,
      seoTitle: 'Fine Art Indian Maternity Photography | DIVASTUDIO',
      seoDescription: 'Artful, serene motherhood portraiture celebrating new life with timeless grace.',
    },
  });

  const catFashion = await prisma.category.create({
    data: {
      name: 'Couture & Royal Fashion',
      slug: 'fashion',
      description: 'Avant-garde Indian couture lookbooks and regal fashion campaigns set against Mughal architecture.',
      coverImage: '/images/cat_royal_fashion.jpg',
      order: 6,
      isFeatured: true,
      seoTitle: 'Indian Couture & Fashion Photography | DIVASTUDIO',
      seoDescription: 'High-fashion editorial campaigns for luxury Indian designers and royal ensembles.',
    },
  });

  // 3. Projects with Rich Galleries
  await prisma.project.create({
    data: {
      title: 'The Royal Udaipur Nuptials',
      slug: 'the-royal-udaipur-nuptials',
      categoryId: catWeddings.id,
      client: 'Mehrunnisa & Jaiveer',
      location: 'City Palace & Jagmandir, Udaipur',
      date: 'Winter 2025',
      sessionType: 'Three-Day Destination Royal Wedding',
      coverImage: '/images/hero_indian_wedding.jpg',
      featuredImage: '/images/cat_royal_weddings.jpg',
      story: 'Over three days on the sacred waters of Lake Pichola, Mehrunnisa and Jaiveer gathered with family across Rajasthan and London. We approached their nuptials not as a chaotic spectacle, but as a living royal painting. Surrounded by hundreds of glowing brass lanterns, floating rose petals, and ancient marble jharokhas, every frame celebrates timeless devotion and aristocratic heritage.',
      tags: 'Royal Wedding, Udaipur, Destination, Sabyasachi, Fine Art',
      isFeatured: true,
      isPublished: true,
      order: 1,
      seoTitle: 'The Royal Udaipur Nuptials | DIVASTUDIO Indian Wedding Story',
      seoDescription: 'A royal destination wedding at Jagmandir Island Palace in Udaipur, photographed by DIVASTUDIO.',
      images: {
        create: [
          {
            url: '/images/hero_indian_wedding.jpg',
            caption: 'The twilight royal portrait in the lantern-lit palace courtyard.',
            aspectRatio: 'wide',
            order: 1,
            isFeatured: true,
          },
          {
            url: '/images/cat_bridal_portrait.jpg',
            caption: 'The Maharani bridal study in heirloom crimson zardozi and polki diamonds.',
            aspectRatio: 'portrait',
            order: 2,
          },
          {
            url: '/images/cat_royal_weddings.jpg',
            caption: 'The emotional varmala exchange under the marigold and jasmine canopy.',
            aspectRatio: 'portrait',
            order: 3,
          },
          {
            url: '/images/cat_prewedding_palace.jpg',
            caption: 'Sunset embrace overlooking Lake Pichola from the royal jharokha.',
            aspectRatio: 'landscape',
            order: 4,
          },
          {
            url: '/images/cat_heritage_family.jpg',
            caption: 'Three generations gathered in affectionate blessing before the pheras.',
            aspectRatio: 'portrait',
            order: 5,
          },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'Solitude in Crimson: The Bridal Monograph',
      slug: 'solitude-in-crimson',
      categoryId: catPortraits.id,
      client: 'Princess Gayatri of Jaipur',
      location: 'Rambagh Palace, Jaipur',
      date: 'Autumn 2025',
      sessionType: 'Fine Art Bridal Portraiture',
      coverImage: '/images/cat_bridal_portrait.jpg',
      featuredImage: '/images/cat_bridal_portrait.jpg',
      story: 'The bridal hour is sacred. Before the music swells and the guests arrive, there exists a quiet reverie. In the stone corridors of Rambagh Palace, we captured the soft weight of the veil, the intricate kundan detailing, and the serene heartbeat of a bride stepping into destiny.',
      tags: 'Bridal Portrait, Royal, Polki, Jaipur, Editorial',
      isFeatured: true,
      isPublished: true,
      order: 2,
      seoTitle: 'Solitude in Crimson | Royal Bridal Portraiture by DIVASTUDIO',
      seoDescription: 'Fine art Indian bridal portrait monograph captured in Jaipur.',
      images: {
        create: [
          {
            url: '/images/cat_bridal_portrait.jpg',
            caption: 'Heirloom matha patti and serene morning contemplation.',
            aspectRatio: 'portrait',
            order: 1,
            isFeatured: true,
          },
          {
            url: '/images/hero_indian_wedding.jpg',
            caption: 'The full ensemble in twilight courtyard radiance.',
            aspectRatio: 'wide',
            order: 2,
          },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'A Symphony of Saffron & Sunshine: The Haldi',
      slug: 'symphony-of-saffron-haldi',
      categoryId: catHaldi.id,
      client: 'Priyanka & Dev',
      location: 'Samode Palace, Rajasthan',
      date: 'Spring 2025',
      sessionType: 'Haldi & Sangeet Candid Narrative',
      coverImage: '/images/cat_haldi_mehendi.jpg',
      featuredImage: '/images/cat_haldi_mehendi.jpg',
      story: 'Pure, unscripted celebration. Amidst showers of fresh yellow marigold petals and turmeric blessings, laughter echoed across the sandstone archways. We remained invisible observers, allowing the unfiltered warmth of sisters, cousins, and elders to flood each frame.',
      tags: 'Haldi, Marigold, Candid, Rajasthan, Emotional',
      isFeatured: true,
      isPublished: true,
      order: 3,
      seoTitle: 'A Symphony of Saffron | Haldi Celebration by DIVASTUDIO',
      seoDescription: 'Joyous candid Haldi ceremony photographed at Samode Palace.',
      images: {
        create: [
          {
            url: '/images/cat_haldi_mehendi.jpg',
            caption: 'Laughter erupting under a blizzard of marigolds.',
            aspectRatio: 'portrait',
            order: 1,
            isFeatured: true,
          },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'Whispers Across the Marble Jharokha',
      slug: 'whispers-across-jharokha',
      categoryId: catPrewedding.id,
      client: 'Rohan & Avani',
      location: 'Taj Lake Palace, Udaipur',
      date: 'Sunset Session, 2025',
      sessionType: 'Destination Pre-Wedding Editorial',
      coverImage: '/images/cat_prewedding_palace.jpg',
      featuredImage: '/images/cat_prewedding_palace.jpg',
      story: 'Standing in a carved white marble pavilion floating on the waters of Udaipur, Rohan and Avani watched the sun descend behind the Aravalli hills. Dressed in emerald silk and midnight bandhgala, their intimacy anchored the grandeur of the palace.',
      tags: 'Pre-Wedding, Udaipur, Lake Palace, Romantic, Editorial',
      isFeatured: true,
      isPublished: true,
      order: 4,
      seoTitle: 'Whispers Across the Marble Jharokha | DIVASTUDIO',
      seoDescription: 'Editorial destination pre-wedding session at Taj Lake Palace, Udaipur.',
      images: {
        create: [
          {
            url: '/images/cat_prewedding_palace.jpg',
            caption: 'Golden hour reflection in the waters of Lake Pichola.',
            aspectRatio: 'portrait',
            order: 1,
            isFeatured: true,
          },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'Matritva: The Architecture of Grace',
      slug: 'matritva-maternity',
      categoryId: catMaternity.id,
      client: 'Dr. Sunita & Siddharth Rao',
      location: 'Private Haveli, Jaipur',
      date: 'Spring 2025',
      sessionType: 'Fine Art Indian Maternity',
      coverImage: '/images/cat_maternity_saree.jpg',
      featuredImage: '/images/cat_maternity_saree.jpg',
      story: 'Draped in ivory and pure gold zari Banarasi silk, Sunita stood in the tranquil courtyard of her ancestral haveli. A celebration of maternal strength, softness, and the quiet dawn before new life arrives.',
      tags: 'Maternity, Banarasi, Saree, Fine Art, Indian',
      isFeatured: false,
      isPublished: true,
      order: 5,
      seoTitle: 'Matritva | Fine Art Indian Maternity by DIVASTUDIO',
      seoDescription: 'Poetic maternity portraiture in traditional handwoven Banarasi silk.',
      images: {
        create: [
          {
            url: '/images/cat_maternity_saree.jpg',
            caption: 'Golden light falling upon handwoven Banarasi weaves.',
            aspectRatio: 'portrait',
            order: 1,
          },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'The Dynasty & The Vows',
      slug: 'the-dynasty-vows',
      categoryId: catWeddings.id,
      client: 'The Singhania Family',
      location: 'Umaid Bhawan Palace, Jodhpur',
      date: 'Winter 2025',
      sessionType: 'Generational Royal Legacy',
      coverImage: '/images/cat_heritage_family.jpg',
      featuredImage: '/images/cat_heritage_family.jpg',
      story: 'Three generations celebrating the marriage of their youngest daughter. From the grandfather in his royal safa to the mother watching with tears of joy, this is the heritage that will be cherished for centuries in hand-bound leather albums.',
      tags: 'Family, Royal, Jodhpur, Generational, Legacy',
      isFeatured: false,
      isPublished: true,
      order: 6,
      seoTitle: 'The Dynasty & The Vows | Royal Family Legacy by DIVASTUDIO',
      seoDescription: 'Generational royal family photography at Umaid Bhawan Palace.',
      images: {
        create: [
          {
            url: '/images/cat_heritage_family.jpg',
            caption: 'Generations united in blessing under the palace arches.',
            aspectRatio: 'portrait',
            order: 1,
          },
        ],
      },
    },
  });

  // 4. Services
  await prisma.service.create({
    data: {
      title: 'Royal Destination Weddings & Pheras',
      slug: 'royal-destination-weddings',
      subtitle: 'Complete multi-day wedding and cinema coverage across heritage palaces and global destinations.',
      description: 'From the welcome dinner and Mehendi to the emotional Varmala, royal Baraat, and sacred Pheras. Our team moves with discretion, capturing every regal spectacle and whispered touch.',
      coverImage: '/images/cat_royal_weddings.jpg',
      startingPrice: '₹4,50,000 / $5,500',
      duration: '2 to 4 Days (Comprehensive)',
      deliverables: 'Private Online Master Suite\nFull-Resolution Color Graded Archives\nHandcrafted Italian Leather Monogram Album\nCinematic 4K Wedding Highlight Film\nPre-Wedding Consultation & Timeline Planning',
      order: 1,
      isFeatured: true,
    },
  });

  await prisma.service.create({
    data: {
      title: 'The Maharani Bridal Portrait Suite',
      slug: 'bridal-portraits',
      subtitle: 'Museum-grade editorial bridal portraiture sculpted with natural and continuous tungsten light.',
      description: 'A slow, private session dedicated entirely to the bride in her full royal regalia. Detailed documentation of zardozi embroidery, polki jewellery, and the serene emotional state before the pheras.',
      coverImage: '/images/cat_bridal_portrait.jpg',
      startingPrice: '₹1,50,000 / $1,800',
      duration: '3 to 4 Hours',
      deliverables: '35 Master Retouched High-Res Photographs\nHandcrafted Linen Print Folio\nFull Jewelry & Couture Detail Archives\nExpedited 48-Hour Preview for Press',
      order: 2,
      isFeatured: true,
    },
  });

  await prisma.service.create({
    data: {
      title: 'Palace Pre-Weddings & Couple Stories',
      slug: 'palace-pre-wedding',
      subtitle: 'Cinematic destination storytelling in Rajasthan palaces, heritage forts, and international destinations.',
      description: 'An unhurried couple experience capturing effortless intimacy amidst majestic architecture, sunset lakes, and regal Mughal arches.',
      coverImage: '/images/cat_prewedding_palace.jpg',
      startingPrice: '₹2,00,000 / $2,400',
      duration: 'Full Day Session',
      deliverables: '60 Curated Master Edits\nDrone & Architectural Perspectives\nWardrobe & Moodboard Styling Consultation\nPrivate Presentation Slideshow',
      order: 3,
      isFeatured: true,
    },
  });

  await prisma.service.create({
    data: {
      title: 'Matritva & Generational Legacy',
      slug: 'matritva-maternity',
      subtitle: 'Artful, poetic celebration of motherhood, traditional silk sarees, and family heritage.',
      description: 'Conducted in heritage havelis or serene daylight studios. Honoring the bond between generations with dignity and artistic stillness.',
      coverImage: '/images/cat_maternity_saree.jpg',
      startingPrice: '₹1,25,000 / $1,500',
      duration: '2 to 3 Hours',
      deliverables: 'Full Curated Legacy Story\nFine Art Cotton Rag Print Box\nPartner & Family Inclusion\nComplimentary Styling Guidance',
      order: 4,
      isFeatured: true,
    },
  });

  // 5. Packages
  await prisma.package.create({
    data: {
      name: 'The Heritage Collection',
      slug: 'the-heritage-collection',
      description: 'Ideal for intimate royal celebrations, bridal monographs, or palace pre-wedding sessions.',
      price: '₹2,50,000 / $3,000',
      showPrice: true,
      duration: 'Single Day Coverage (Up to 8 Hours)',
      imagesCount: '150+ Curated Master Edits',
      deliverables: 'Private Online Gallery\nTwo Master Photographers\nSignature Fine Art Color Grading\nDigital Delivery in 21 Days\nHandmade Linen Folio with 15 Fine Art Prints',
      isFeatured: false,
      order: 1,
    },
  });

  await prisma.package.create({
    data: {
      name: 'The Royal Atelier Commission',
      slug: 'the-royal-atelier-commission',
      description: 'Our most revered experience for luxury multi-day destination weddings in Udaipur, Jaipur, or international palaces.',
      price: '₹6,50,000 / $7,800',
      showPrice: true,
      duration: 'Three-Day Complete Coverage (Mehendi, Sangeet, Wedding, Reception)',
      imagesCount: 'Full Story (500+ Photographs)',
      deliverables: 'Team of 4 Master Photographers & Cinematographers\nHandcrafted Florentine Leather Heirloom Album (35x35cm)\nTwo Companion Parent Albums\n4K Cinematic Ambient Wedding Film\nExpress 72-Hour Wedding Preview Suite',
      isFeatured: true,
      order: 2,
    },
  });

  await prisma.package.create({
    data: {
      name: 'The Imperial Bespoke Legacy',
      slug: 'the-imperial-bespoke',
      description: 'The pinnacle of luxury wedding documentation for royal dynasties, multi-city celebrations, and grand editorial campaigns.',
      price: 'Custom Imperial Quote',
      showPrice: false,
      duration: 'Unlimited Multi-Day Coverage',
      imagesCount: 'Complete Archival Collection (1000+ Master Works)',
      deliverables: 'Founders & Creative Directors Elena Vance & Julian Thorne On-Site\nDrone Cinematography & Vintage 35mm Film Coverage\nHand-Bound Tuscany Leather Trunk with 3 Heirloom Books\nArchival Solander Box with 50 Matted Museum Prints\nConcierge White-Glove Hand Delivery Anywhere in the World',
      isFeatured: false,
      order: 3,
    },
  });

  // 6. Package Add-ons
  await prisma.packageAddon.createMany({
    data: [
      {
        name: 'Handcrafted Tuscan Leather Heirloom Album (35x35cm)',
        description: 'Bound in Florence with 310gsm Hahnemühle acid-free cotton paper and embossed royal monogram.',
        price: '₹75,000 / $900',
        order: 1,
      },
      {
        name: '4K Cinematic Ambient Wedding Film',
        description: 'Atmospheric 5-7 minute visual poem scored with original classical instruments and vows.',
        price: '₹1,50,000 / $1,800',
        order: 2,
      },
      {
        name: 'Traditional 35mm & 120 Medium-Format Film Coverage',
        description: 'Shot on Leica and Hasselblad using Kodak Portra film, hand-developed in archival chemistry.',
        price: '₹65,000 / $800',
        order: 3,
      },
      {
        name: 'Express 48-Hour Media & Press Preview',
        description: 'White-glove priority master editing for immediate publication, family circulation, or social announcement.',
        price: '₹40,000 / $500',
        order: 4,
      },
    ],
  });

  // 7. Albums & Physical Prints
  await prisma.albumPrint.createMany({
    data: [
      [
        'The Tuscan Leather Heirloom Album',
        'Album',
        'Crafted in Florence using vegetable-tanned Italian calfskin, embossed with your bespoke monogram. Printed on heavy 310gsm Hahnemühle cotton rag paper with seamless panoramic spreads.',
        '35 x 35 cm / 50 Spreads',
        '₹85,000 / $1,050',
        '/images/hero_indian_wedding.jpg',
        1,
      ],
      [
        'The Raw Silk & Gold Debossed Monograph',
        'Book',
        'Wrapped in crimson or raw ivory handwoven silk with debossed gold-foil calligraphy. Designed with editorial typography and museum-certified archival inks.',
        '30 x 30 cm / 40 Spreads',
        '₹65,000 / $800',
        '/images/cat_bridal_portrait.jpg',
        2,
      ],
      [
        'The Archival Solander Print Box',
        'Print',
        'A museum-grade clamshell presentation box lined in Banarasi silk. Holds thirty 8x10 inch fine art prints mounted on archival 4-ply cotton rag museum board.',
        '25 x 30 cm / 30 Matted Prints',
        '₹50,000 / $620',
        '/images/cat_royal_weddings.jpg',
        3,
      ],
      [
        'Hand-Stretched Floating Canvas',
        'Canvas',
        'Hand-stretched Belgian linen canvas sealed with UV protective museum varnish and float-framed in solid natural walnut.',
        '75 x 100 cm Custom Walnut Frame',
        '₹45,000 / $550',
        '/images/cat_prewedding_palace.jpg',
        4,
      ],
    ].map(([name, type, description, dimensions, price, coverImage, order]) => ({
      name: name as string,
      type: type as string,
      description: description as string,
      dimensions: dimensions as string,
      price: price as string,
      coverImage: coverImage as string,
      order: order as number,
      isAvailable: true,
    })),
  });

  // 8. Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Mehrunnisa & Jaiveer Rathore',
        sessionType: 'Three-Day Royal Wedding at Jagmandir Palace',
        location: 'Udaipur, Rajasthan',
        quote: 'DIVASTUDIO transformed our wedding into an unforgettable visual poem. Looking through our Italian leather album feels like opening an exquisite art monograph of our love. There is zero artificial staging, just pure, breathtaking emotion.',
        rating: 5,
        isFeatured: true,
        order: 1,
      },
      {
        clientName: 'Priyanka & Karan Singhania',
        sessionType: 'Destination Wedding & Haldi at Samode Palace',
        location: 'Jaipur, India',
        quote: 'The team moved like shadows, never once interrupting the sacred pheras or asking us to pose. Yet every candid tear, every burst of laughter during the haldi, was captured with museum-grade elegance.',
        rating: 5,
        isFeatured: true,
        order: 2,
      },
      {
        clientName: 'Aditya & Tara Kapoor',
        sessionType: 'Pre-Wedding at Taj Lake Palace',
        location: 'Udaipur, India',
        quote: 'In an era of generic wedding videos, DIVASTUDIO creates genuine timeless art. Their deep understanding of Indian traditions and royal architecture sets them miles apart from anyone else.',
        rating: 5,
        isFeatured: true,
        order: 3,
      },
    ],
  });

  // 9. FAQs
  await prisma.faq.createMany({
    data: [
      {
        question: 'What is your photographic philosophy for Indian weddings?',
        answer: 'Indian weddings are magnificent tapestries of tradition, family emotions, and sacred rituals. Our philosophy is rooted in unobtrusive observation, cinematic natural light, and quiet elegance. We honor every ritual—from the Ganesh Pooja and Mehendi to the Varmala and Pheras—capturing real devotion rather than artificial stiff poses.',
        category: 'General',
        order: 1,
      },
      {
        question: 'Do you travel internationally and across destination cities in India?',
        answer: 'Yes. Over eighty percent of our commissions take place in destination locations—including Udaipur, Jaipur, Jodhpur, Goa, Kerala, Muscat, Lake Como, and London. All travel logistics and team accommodations are seamlessly coordinated through our atelier concierge.',
        category: 'Booking',
        order: 2,
      },
      {
        question: 'How far in advance should we reserve our wedding dates?',
        answer: 'Because of the multi-day nature of Indian weddings and our commitment to white-glove curation, we accept only 18 to 22 wedding commissions each year. Most couples reserve their dates 8 to 14 months in advance, especially for the autumn and winter wedding seasons.',
        category: 'Booking',
        order: 3,
      },
      {
        question: 'When will we receive our wedding photographs and cinema?',
        answer: 'You will receive an exclusive private preview suite of 50 highlight master photographs within 72 hours of your reception. Your full curated online gallery is delivered in 4 to 6 weeks, and your handcrafted heirloom albums in 8 to 10 weeks.',
        category: 'Delivery',
        order: 4,
      },
      {
        question: 'Do you offer physical heirloom albums?',
        answer: 'Yes. We believe wedding memories deserve physical permanence. We work with heritage bookbinders in Florence and Munich to create lay-flat archival albums printed on 310gsm cotton rag paper that will endure for over 150 years without fading.',
        category: 'Heirlooms',
        order: 5,
      },
    ],
  });

  // 10. Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'The Sacred Stillness: Documenting Royal Indian Wedding Pheras',
        slug: 'documenting-royal-pheras',
        excerpt: 'Why the sacred fire, the Vedic hymns, and the unscripted glance between bride and groom hold timeless emotional gravity.',
        content: `In Indian wedding photography, the pheras are the spiritual heartbeat of the celebration. When the smoke of the havan rises and the Vedic chants reverberate through palace courtyards, a profound stillness descends.

At DIVASTUDIO, our approach to pheras is one of complete reverence. We never use invasive flashbulbs or disrupt the priest's mantras. Instead, we use ultra-fast prime lenses and medium-format sensors that drink in the golden amber light of the sacred flames.

The resulting photographs hold true emotional gravitas—capturing the gentle clasp of hands, the blessing of parents, and the sacred vows that bind two souls for lifetimes.`,
        coverImage: '/images/hero_indian_wedding.jpg',
        category: 'Rituals & Heritage',
        author: 'Elena Vance & Julian Thorne',
        readTime: '4 min read',
        seoTitle: 'Documenting Royal Indian Wedding Pheras | DIVASTUDIO',
        seoDescription: 'The art of capturing sacred Indian wedding rituals with cinematic reverence.',
      },
      {
        title: 'The Heritage Palette: Styling for Luxury Indian Weddings',
        slug: 'heritage-palette-indian-weddings',
        excerpt: 'How zardozi embroidery, raw silk, and royal tones harmonize with Rajasthan palace architecture.',
        content: `When planning your wedding wardrobe across Mehendi, Sangeet, and the wedding day, color choices interact deeply with the venue's architectural textures.

1. Deep Crimson & Antique Zari: Timeless for the wedding day, providing majestic contrast against white marble and yellow sandstone.
2. Saffron & Marigold Yellow: Pure celebration for Haldi and Mehendi, vibrating with warmth in afternoon sunlight.
3. Emerald Green & Midnight Velvet: Majestic choices for palace pre-weddings and evening receptions under starlit skies.`,
        coverImage: '/images/cat_bridal_portrait.jpg',
        category: 'Styling & Regalia',
        author: 'Julian Thorne, Principal Photographer',
        readTime: '5 min read',
        seoTitle: 'Styling Guide for Indian Destination Weddings | DIVASTUDIO',
        seoDescription: 'Curating royal bridal couture and heritage palettes for destination weddings.',
      },
    ],
  });

  // 11. Photographer Profile
  await prisma.photographerProfile.create({
    data: {
      name: 'Elena Vance & Julian Thorne',
      role: 'Founders & Creative Directors',
      portraitImage: '/images/cat_bridal_portrait.jpg',
      bio: 'Trained in classical fine arts and editorial direction in Paris, Milan, and India, Elena and Julian founded DIVASTUDIO to bring museum-grade intentionality and cinematic storytelling to royal weddings and private legacies. Their work is celebrated for its emotional depth and architectural poise.',
      philosophy: 'We do not photograph poses. We photograph the moments between them.',
      specialties: 'Royal Destination Weddings, Maharani Bridal Portraits, Haldi Celebrations, Heritage Palaces',
      studioLocation: 'Atelier SoHo (New York), Mumbai & Milan',
    },
  });

  // 12. Studio Info
  await prisma.studioInfo.create({
    data: {
      name: 'DIVASTUDIO Atelier',
      description: 'An international fine art photography studio dedicated to documenting luxury Indian destination weddings and timeless family legacies.',
      address: '128 Mercer Street, New York & Nariman Point, Mumbai',
      phone: '+91 98200 84720',
      email: 'concierge@divastudio.com',
      whatsapp: '+91 98200 84720',
      instagram: '@divastudio.official',
      facebook: 'facebook.com/divastudio',
      hours: 'Monday — Saturday: 10:00 AM — 7:00 PM (By Private Appointment)',
      studioImages: JSON.stringify([
        '/images/hero_indian_wedding.jpg',
        '/images/cat_royal_weddings.jpg',
        '/images/cat_prewedding_palace.jpg',
        '/images/cat_bridal_portrait.jpg',
      ]),
    },
  });

  // 13. Site Settings
  await prisma.siteSetting.createMany({
    data: [
      {
        key: 'hero_headline',
        value: 'Stories Worth\nRemembering.',
        description: 'Main editorial headline in the hero section',
      },
      {
        key: 'hero_subheadline',
        value: 'Timeless royal celebrations, bridal portraiture, and human devotion captured with cinematic grace and editorial stillness.',
        description: 'Supporting editorial copy in the hero section',
      },
      {
        key: 'hero_image_desktop',
        value: '/images/hero_indian_wedding.jpg',
        description: 'Desktop cinematic hero image',
      },
      {
        key: 'hero_image_mobile',
        value: '/images/hero_indian_wedding.jpg',
        description: 'Mobile hero image',
      },
      {
        key: 'statement_quote',
        value: 'PHOTOGRAPHS ARE NOT JUST IMAGES. THEY ARE PIECES OF TIME.',
        description: 'Large editorial statement quote',
      },
      {
        key: 'statement_story',
        value: 'We exist for those who cherish the quiet weight of a memory and the grandeur of heritage. In palace courtyards across Rajasthan and worldwide, we create photographs that will anchor your family legacy for generations.',
        description: 'Editorial brand manifesto story',
      },
      {
        key: 'instagram_handle',
        value: '@divastudio.official',
        description: 'Instagram handle',
      },
      {
        key: 'instagram_url',
        value: 'https://instagram.com',
        description: 'Instagram profile URL',
      },
    ],
  });

  console.log('Seeding finished with Royal Indian Wedding assets!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
