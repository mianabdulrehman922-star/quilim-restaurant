import React, { useState, useEffect, useMemo } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Search,
  X,
  ChevronRight,
  ChevronLeft,
  Menu as MenuIcon,
  Utensils,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Info,
  Navigation,
  ArrowRight
} from 'lucide-react';

const BUSINESS_INFO = {
  name: "QUILIM RESTAURANT",
  tagline: "Where Every Dish Tells a Story.",
  subTagline: "A refined multi-cuisine dining experience in the heart of Faisalabad.",
  category: "Premium Multi-Cuisine Restaurant",
  address: "C457+47J Hashmat Ali, Khan Road, Block C, People's Colony No. 1, Faisalabad, Punjab, Pakistan",
  shortAddress: "Block C, People's Colony No. 1, Faisalabad",
  phonePrimary: "041-8540373",
  phonePrimaryRaw: "+92418540373",
  phoneAlt: "0344-4457210",
  phoneAltRaw: "+923444457210",
  openingHours: "Daily 11:00 AM – 12:00 AM",
  rating: "4.7",
  reviewCount: "5,900+",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Quilim+Restaurant+Hashmat+Ali+Khan+Road+Peoples+Colony+No+1+Faisalabad"
};

const CATEGORIES = [
  { id: "ALL", label: "All Menu" },
  { id: "BBQ & GRILL", label: "BBQ & Grill" },
  { id: "CHINESE", label: "Chinese Cuisine" },
  { id: "BURGERS & SANDWICHES", label: "Burgers & Sandwiches" },
  { id: "KARAHI & HANDI", label: "Karahi & Handi" },
  { id: "RICE & BIRYANI", label: "Rice & Biryani" },
  { id: "SEAFOOD", label: "Seafood Delights" },
  { id: "MAIN COURSE", label: "Main Course" },
  { id: "DESSERTS", label: "Desserts & Sweet Treats" },
  { id: "BEVERAGES", label: "Mocktails & Drinks" },
  { id: "DEALS & COMBOS", label: "Deals & Combos" },
  { id: "SALADS & SOUPS", label: "Salads & Soups" }
];

const SIGNATURE_DEALS = [
  {
    id: "deal-1",
    title: "LUNCH DEAL",
    price: "Rs. 890",
    description: "Single lunch meal deal featuring choice of fried rice, chicken Manchurian/chilli dry, and a refreshing soft drink.",
    tag: "Daily Lunch Special",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "deal-2",
    title: "HI TEA PLATTER",
    price: "Rs. 2,850",
    description: "An assortment of miniature burgers, chicken wings, fish bites, spring rolls, mini pastries, tea or iced coffee.",
    tag: "High Tea Favorite",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "deal-3",
    title: "CONTINENTAL PLATTER",
    price: "Rs. 2,680",
    description: "Grilled chicken steak with mushroom sauce, garlic bread, mashed potatoes, pasta bowl, and sauteed vegetables.",
    tag: "Chef Special",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "deal-4",
    title: "SEAFOOD PLATTER",
    price: "Rs. 3,200",
    description: "Crispy battered fish fillets, grilled prawns, spicy calamari rings served with tartar dip, garlic rice & fries.",
    tag: "Premium Seafood",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "deal-5",
    title: "BBQ PLATTER (SMALL)",
    price: "Rs. 4,040",
    description: "Combination of Chicken Malai Boti, Seekh Kabab, Reshmi Kabab, Fish Tikka, Naan platter, mint chutney & fresh salad.",
    tag: "Family Sharing (2-3 Pax)",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "deal-6",
    title: "BBQ PLATTER (LARGE)",
    price: "Rs. 5,830",
    description: "Grand feast with Mutton Chops, Chicken Tikka, Malai Boti, Beef Seekh Kabab, Fish Tikka, Roghani Naans & drinks pitcher.",
    tag: "Grand Feast (4-6 Pax)",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "deal-7",
    title: "TURKISH PLATTER",
    price: "Rs. 4,890",
    description: "Adana Kabab, Shish Taouk, Doner Meat slices, Turkish butter rice, grilled tomatoes, hummus, and warm pita bread.",
    tag: "Middle Eastern Fusion",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=800&auto=format&fit=crop"
  }
];

const MENU_ITEMS = [
  // BBQ & Grill
  {
    id: "m1",
    name: "Chicken Malai Tikka Boti",
    category: "BBQ & GRILL",
    price: "Rs. 1,290",
    description: "Tender chicken chunks marinated in rich cream, green cardamom, and aromatic white spices, charcoal grilled.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m2",
    name: "Special Mutton Seekh Kabab",
    category: "BBQ & GRILL",
    price: "Rs. 1,650",
    description: "Minced mutton seasoned with traditional house spices, herbs, skewers charcoal-roasted to perfection.",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m3",
    name: "Smoked BBQ Lamb Chops",
    category: "BBQ & GRILL",
    price: "Rs. 2,450",
    description: "Succulent prime lamb chops slow-marinated in house BBQ glaze and smoked over hickory wood coals.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
    featured: false
  },
  {
    id: "m4",
    name: "Charcoal Fish Tikka",
    category: "BBQ & GRILL",
    price: "Rs. 1,590",
    description: "Boneless red snapper cubes dusted with carom seeds, red chili flakes, grilled over open flames.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop",
    featured: false
  },

  // Chinese
  {
    id: "m5",
    name: "Kung Pao Chicken",
    category: "CHINESE",
    price: "Rs. 1,350",
    description: "Diced chicken wok-tossed with roasted peanuts, chili pods, bell peppers in a savory Sichuan soy glaze.",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m6",
    name: "Crispy Beef Chilli Dry",
    category: "CHINESE",
    price: "Rs. 1,490",
    description: "Sliced crispy beef strips stir-fried with green chillies, ginger julienne, and dark aromatic soy sauce.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m7",
    name: "Chicken Manchurian",
    category: "CHINESE",
    price: "Rs. 1,280",
    description: "Classic tender chicken spheres in a velvety tangy tomato garlic chili sauce, garnished with scallions.",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=600&auto=format&fit=crop",
    featured: false
  },

  // Karahi & Handi
  {
    id: "m8",
    name: "Special Desi Ghee Mutton Karahi",
    category: "KARAHI & HANDI",
    price: "Rs. 2,890",
    description: "Fresh mutton cooked live in pure organic desi ghee, roasted tomatoes, ginger juliennes, and cracked black pepper.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m9",
    name: "Chicken White Handi",
    category: "KARAHI & HANDI",
    price: "Rs. 1,650",
    description: "Boneless chicken simmered in clay pot with heavy double cream, yogurt, white pepper, and green cardamom.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m10",
    name: "Paneer Reshmi Handi",
    category: "KARAHI & HANDI",
    price: "Rs. 1,220",
    description: "Cottage cheese cubes cooked in rich silky cashewnut and butter tomato gravy garnished with coriander.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop",
    featured: false
  },

  // Burgers & Sandwiches
  {
    id: "m11",
    name: "Quilim Signature Smash Burger",
    category: "BURGERS & SANDWICHES",
    price: "Rs. 980",
    description: "Double crispy smash beef patties, melted cheddar cheese, caramelized onions, house truffle mayo in brioche bun.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m12",
    name: "Crunchy Zinger Supreme",
    category: "BURGERS & SANDWICHES",
    price: "Rs. 790",
    description: "Crispy fried spiced chicken fillet, spicy slaw, jalapeños, melted cheese slice, served with steak fries.",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=600&auto=format&fit=crop",
    featured: false
  },

  // Rice & Biryani
  {
    id: "m13",
    name: "Special Mutton Dum Biryani",
    category: "RICE & BIRYANI",
    price: "Rs. 1,350",
    description: "Long-grain basmati rice layered with succulent marinated mutton, saffron, kewra water, and caramelised onions.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m14",
    name: "Yangzhou Egg Fried Rice",
    category: "RICE & BIRYANI",
    price: "Rs. 690",
    description: "Fragrant wok-tossed basmati rice with fluffy scrambled eggs, spring onions, diced carrots and light sesame soy.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop",
    featured: false
  },

  // Seafood
  {
    id: "m15",
    name: "Grilled Jumbo Prawns",
    category: "SEAFOOD",
    price: "Rs. 2,950",
    description: "Char-grilled tiger prawns brushed with garlic herb butter, lemon zest, served with garlic rice.",
    image: "https://images.unsplash.com/photo-1559742811-822863c46f83?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m16",
    name: "Crispy Batter Fish & Chips",
    category: "SEAFOOD",
    price: "Rs. 1,480",
    description: "Crispy golden fried fish fillets, thick cut chips, house tartar dip, and fresh lemon wedge.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop",
    featured: false
  },

  // Main Course
  {
    id: "m17",
    name: "Tarragon Grilled Chicken Steak",
    category: "MAIN COURSE",
    price: "Rs. 1,690",
    description: "Juicy chicken breast grilled with aromatic tarragon creamy herb sauce, mashed potatoes & grilled vegetables.",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=600&auto=format&fit=crop",
    featured: true
  },

  // Desserts
  {
    id: "m18",
    name: "Hot Sizzling Brownie with Vanilla Ice Cream",
    category: "DESSERTS",
    price: "Rs. 680",
    description: "Rich dark chocolate brownie served sizzling on iron skillet with hot Belgian chocolate sauce & vanilla bean ice cream.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m19",
    name: "Traditional Gulab Jamun with Rabri",
    category: "DESSERTS",
    price: "Rs. 490",
    description: "Warm golden milk solids dumplings soaked in cardamom saffron syrup, topped with thick almond rabri.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=600&auto=format&fit=crop",
    featured: false
  },

  // Beverages
  {
    id: "m20",
    name: "Mint Margarita",
    category: "BEVERAGES",
    price: "Rs. 390",
    description: "Fresh mint leaves crushed with lime juice, sprite, black salt, and crushed crystal ice.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
    featured: true
  },
  {
    id: "m21",
    name: "Pina Colada Chill",
    category: "BEVERAGES",
    price: "Rs. 450",
    description: "Creamy coconut milk blended with fresh pineapple juice and crushed ice, garnished with maraschino cherry.",
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=600&auto=format&fit=crop",
    featured: false
  }
];

const GALLERY_IMAGES = [
  {
    id: "g1",
    category: "FOOD",
    title: "Signature Malai Boti BBQ",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=800&auto=format&fit=crop",
    caption: "Slow-roasted tender chicken tikka cooked over natural charcoal."
  },
  {
    id: "g2",
    category: "PLATTERS",
    title: "Grand BBQ Feast Platter",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
    caption: "An lavish assortment of mutton chops, seekh kababs, and naan spread."
  },
  {
    id: "g3",
    category: "AMBIENCE",
    title: "Elegant Dining Atmosphere",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    caption: "Sophisticated interior warm lighting for memorable family dining."
  },
  {
    id: "g4",
    category: "BBQ",
    title: "Special Mutton Seekh Skewers",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=800&auto=format&fit=crop",
    caption: "Traditional house-marinated skewers grilled freshly to order."
  },
  {
    id: "g5",
    category: "DRINKS",
    title: "Refreshing Artisan Mocktails",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
    caption: "Handcrafted mint margaritas and seasonal cooling beverages."
  },
  {
    id: "g6",
    category: "FOOD",
    title: "Royal Desi Ghee Karahi",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
    caption: "Rich mutton karahi prepared with pure organic desi ghee and fresh ginger."
  },
  {
    id: "g7",
    category: "PLATTERS",
    title: "Hi Tea Evening Spread",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
    caption: "Delightful savoury and sweet platter crafted for tea lovers."
  },
  {
    id: "g8",
    category: "AMBIENCE",
    title: "Private Family Seating Area",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
    caption: "Spacious and comfortable private seating arrangements in People's Colony No. 1."
  }
];

export default function App() {
  // Navigation State
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Interactive Menu State
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Gallery & Lightbox State
  const [galleryFilter, setGalleryFilter] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Modal / Form Feedback States
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [reservationData, setReservationData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "19:30",
    guests: "2",
    notes: ""
  });
  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["home", "about", "menu", "deals", "gallery", "visit", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        item.category.toUpperCase().includes(selectedCategory.toUpperCase()) ||
        selectedCategory.toUpperCase().includes(item.category.toUpperCase());
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const filteredGallery = useMemo(() => {
    if (galleryFilter === "ALL") return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((img) => img.category === galleryFilter);
  }, [galleryFilter]);

  // Form Submit Handlers
  const handleReservationSubmit = (e) => {
    e.preventDefault();
    if (!reservationData.name || !reservationData.phone) return;
    setReservationSubmitted(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.phone) return;
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F4EFE7] font-sans antialiased selection:bg-[#C9A86A] selection:text-[#111111]">

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#181512]/95 backdrop-blur-md py-4 border-b border-[#C9A86A]/15 shadow-2xl"
            : "bg-gradient-to-b from-[#111111]/90 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-left group focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-[#F4EFE7] group-hover:text-[#C9A86A] transition-colors">
              QUILIM
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-[#C9A86A] uppercase font-light">
              Faisalabad
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "menu", label: "Menu" },
              { id: "deals", label: "Deals" },
              { id: "gallery", label: "Gallery" },
              { id: "visit", label: "Visit Us" },
              { id: "contact", label: "Contact" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-xs uppercase tracking-widest font-medium transition-all duration-300 relative py-1 ${
                  activeSection === link.id
                    ? "text-[#C9A86A]"
                    : "text-[#D8C7AD]/80 hover:text-[#F4EFE7]"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A86A] rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Call & Mobile Hamburger */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection("reservation")}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#111111] bg-[#C9A86A] hover:bg-[#D8C7AD] transition-all duration-300 rounded-sm shadow-md hover:shadow-lg focus:ring-2 focus:ring-[#C9A86A] focus:ring-offset-2 focus:ring-offset-[#111111]"
            >
              Reserve Table
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F4EFE7] hover:text-[#C9A86A] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <MenuIcon size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#181512]/98 backdrop-blur-xl lg:hidden flex flex-col justify-center px-8 py-16 animate-fadeIn">
          <div className="space-y-6 text-center">
            <span className="font-serif text-3xl text-[#C9A86A] tracking-wider block mb-4">
              QUILIM
            </span>
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About Experience" },
              { id: "menu", label: "Menu & Cuisine" },
              { id: "deals", label: "Deals & Platters" },
              { id: "gallery", label: "Photo Gallery" },
              { id: "visit", label: "Location & Hours" },
              { id: "contact", label: "Contact Us" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full py-2 text-lg uppercase tracking-widest text-[#F4EFE7] hover:text-[#C9A86A] transition-colors border-b border-[#C9A86A]/10"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-6">
              <button
                onClick={() => scrollToSection("reservation")}
                className="w-full py-3 text-sm font-semibold uppercase tracking-widest text-[#111111] bg-[#C9A86A] hover:bg-[#D8C7AD] transition-colors rounded-sm"
              >
                Reserve A Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1920&auto=format&fit=crop"
            alt="Quilim Restaurant Food Presentation"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-10000 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#111111]/50 to-[#111111]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#C9A86A]/30 bg-[#181512]/80 backdrop-blur-md mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span className="text-xs font-semibold tracking-widest text-[#C9A86A] uppercase">
              FINE DINING • FAISALABAD
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#F4EFE7] leading-[1.15] mb-6">
            Where Every Dish <br />
            <span className="italic text-[#C9A86A] font-serif">Tells a Story.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#D8C7AD]/90 font-light leading-relaxed mb-10">
            {BUSINESS_INFO.subTagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("menu")}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#111111] bg-[#C9A86A] hover:bg-[#D8C7AD] transition-all duration-300 rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Explore Menu
            </button>
            <button
              onClick={() => scrollToSection("reservation")}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#F4EFE7] border border-[#C9A86A]/50 hover:bg-[#C9A86A]/10 transition-all duration-300 rounded-sm"
            >
              Reserve A Table
            </button>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#D8C7AD] hover:text-[#C9A86A] transition-colors"
            >
              <span>Get Directions</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Fact Cards */}
          <div className="mt-16 pt-10 border-t border-[#C9A86A]/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-[#C9A86A]">4.7 ★</p>
              <p className="text-xs text-[#D8C7AD]/70 uppercase tracking-widest mt-1">Google Rating</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-[#C9A86A]">5,900+</p>
              <p className="text-xs text-[#D8C7AD]/70 uppercase tracking-widest mt-1">Guest Reviews</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-[#C9A86A]">100%</p>
              <p className="text-xs text-[#D8C7AD]/70 uppercase tracking-widest mt-1">Multi-Cuisine</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-[#C9A86A]">11 AM–12 AM</p>
              <p className="text-xs text-[#D8C7AD]/70 uppercase tracking-widest mt-1">Open Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-[#181512] border-t border-b border-[#C9A86A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9A86A] block">
                THE QUILIM EXPERIENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F4EFE7] leading-tight">
                Good Food. <br />
                <span className="italic text-[#C9A86A]">Beautiful Moments.</span>
              </h2>
              <p className="text-[#D8C7AD]/80 text-base leading-relaxed font-light">
                Quilim Restaurant offers a diverse multi-cuisine dining experience in Faisalabad, bringing together a wide selection of dishes, platters, beverages and desserts in one destination.
              </p>
              <p className="text-[#D8C7AD]/70 text-sm leading-relaxed font-light">
                Located conveniently on Hashmat Ali Khan Road in People's Colony No. 1, we offer comfortable seating for families, gatherings, and special evenings.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-sm bg-[#111111]/80 border border-[#C9A86A]/10">
                  <p className="text-xs font-bold text-[#C9A86A] tracking-wider uppercase mb-1">01 — MULTI-CUISINE</p>
                  <p className="text-xs text-[#D8C7AD]/80">A diverse menu bringing together multiple flavors and dining styles.</p>
                </div>
                <div className="p-4 rounded-sm bg-[#111111]/80 border border-[#C9A86A]/10">
                  <p className="text-xs font-bold text-[#C9A86A] tracking-wider uppercase mb-1">02 — SIGNATURE PLATTERS</p>
                  <p className="text-xs text-[#D8C7AD]/80">Generous platters designed for sharing and memorable gatherings.</p>
                </div>
                <div className="p-4 rounded-sm bg-[#111111]/80 border border-[#C9A86A]/10">
                  <p className="text-xs font-bold text-[#C9A86A] tracking-wider uppercase mb-1">03 — PREMIUM DINING</p>
                  <p className="text-xs text-[#D8C7AD]/80">An inviting environment for family meals, celebrations and casual dining.</p>
                </div>
                <div className="p-4 rounded-sm bg-[#111111]/80 border border-[#C9A86A]/10">
                  <p className="text-xs font-bold text-[#C9A86A] tracking-wider uppercase mb-1">04 — DINING VARIETY</p>
                  <p className="text-xs text-[#D8C7AD]/80">Explore BBQ, Chinese, Karahi, burgers, seafood, rice dishes, desserts & beverages.</p>
                </div>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative z-10 rounded-sm overflow-hidden border border-[#C9A86A]/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
                  alt="Quilim Restaurant Interior Ambience"
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 z-20 hidden sm:block p-6 bg-[#111111] border border-[#C9A86A]/30 rounded-sm max-w-xs shadow-2xl">
                <p className="font-serif text-lg font-bold text-[#C9A86A]">4.7 / 5 Rating</p>
                <p className="text-xs text-[#D8C7AD]/80 mt-1">Based on 5,900+ verified customer reviews on Google Maps.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9A86A] block mb-2">
              OUR CULINARY SELECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F4EFE7]">
              Explore the Menu
            </h2>
            <p className="text-[#D8C7AD]/70 text-sm mt-3 font-light">
              Select a category or search your favourite dishes prepared freshly by our culinary team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A86A] w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search barbecue, karahi, steak, drinks..."
                className="w-full bg-[#181512] border border-[#C9A86A]/30 rounded-full py-3 pl-11 pr-10 text-xs text-[#F4EFE7] placeholder-[#D8C7AD]/40 focus:outline-none focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D8C7AD]/50 hover:text-[#F4EFE7]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs Slider */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start sm:justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full whitespace-nowrap transition-all duration-300 border ${
                  selectedCategory === cat.id
                    ? "bg-[#C9A86A] text-[#111111] border-[#C9A86A] font-bold shadow-md"
                    : "bg-[#181512] text-[#D8C7AD]/80 border-[#C9A86A]/15 hover:border-[#C9A86A]/40 hover:text-[#F4EFE7]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filtered Menu Cards Grid */}
          {filteredMenuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#181512] rounded-sm overflow-hidden border border-[#C9A86A]/15 hover:border-[#C9A86A]/40 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden bg-[#111111]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-[#C9A86A]/20">
                      <span className="text-[10px] font-semibold text-[#C9A86A] uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-serif text-lg text-[#F4EFE7] group-hover:text-[#C9A86A] transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-bold text-[#C9A86A] text-sm whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#D8C7AD]/70 leading-relaxed font-light mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#C9A86A]/10 flex items-center justify-between text-[11px] text-[#D8C7AD]/50">
                      <span>Quilim Kitchen</span>
                      <button
                        onClick={() => scrollToSection("reservation")}
                        className="text-[#C9A86A] hover:underline font-medium"
                      >
                        Order at Table →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#181512] rounded-sm border border-[#C9A86A]/10">
              <Utensils className="w-10 h-10 text-[#C9A86A]/40 mx-auto mb-3" />
              <p className="text-[#F4EFE7] font-serif text-lg">No dishes found matching your search</p>
              <p className="text-xs text-[#D8C7AD]/60 mt-1">Try clearing filters or search query.</p>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 text-xs uppercase tracking-widest text-[#111111] bg-[#C9A86A] rounded-sm font-semibold"
              >
                Reset Menu View
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Selection */}
      <section className="py-20 bg-[#181512] border-t border-b border-[#C9A86A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9A86A] block mb-2">
                CHEF'S HIGHLIGHTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EFE7]">
                Featured Selection
              </h2>
            </div>
            <button
              onClick={() => scrollToSection("menu")}
              className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-widest text-[#C9A86A] hover:text-[#D8C7AD] flex items-center space-x-1"
            >
              <span>View All Dishes</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENU_ITEMS.filter((i) => i.featured).slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-[#111111] p-4 rounded-sm border border-[#C9A86A]/15 hover:border-[#C9A86A]/40 transition-all group"
              >
                <div className="h-40 overflow-hidden rounded-sm mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-[10px] font-bold text-[#C9A86A] uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-base text-[#F4EFE7] mb-1 group-hover:text-[#C9A86A] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs font-bold text-[#C9A86A]">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals */}
      <section id="deals" className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9A86A] block mb-2">
              SIGNATURE PLATTERS & COMBOS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F4EFE7]">
              Special Deals & Platters
            </h2>
            <p className="text-[#D8C7AD]/70 text-sm mt-3 font-light">
              Crafted for family sharing, feast gatherings, and executive lunches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SIGNATURE_DEALS.map((deal) => (
              <div
                key={deal.id}
                className="bg-[#181512] rounded-sm overflow-hidden border border-[#C9A86A]/20 hover:border-[#C9A86A]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-[#C9A86A] text-[#111111] px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm shadow-md">
                      {deal.price}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-[#111111]/90 backdrop-blur-md px-2.5 py-1 text-[10px] text-[#C9A86A] font-semibold uppercase tracking-widest border border-[#C9A86A]/30">
                      {deal.tag}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl text-[#F4EFE7] mb-2 group-hover:text-[#C9A86A] transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-xs text-[#D8C7AD]/80 leading-relaxed font-light mb-4">
                      {deal.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button
                    onClick={() => scrollToSection("reservation")}
                    className="w-full py-2.5 text-xs font-bold uppercase tracking-widest text-[#111111] bg-[#C9A86A] hover:bg-[#D8C7AD] transition-colors rounded-sm"
                  >
                    Reserve Platter
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 bg-[#181512] border border-[#C9A86A]/15 rounded-sm flex items-center justify-center space-x-2 text-center text-xs text-[#D8C7AD]/70">
            <Info size={16} className="text-[#C9A86A] flex-shrink-0" />
            <span>Prices and menu availability may change. Please confirm with the restaurant before ordering.</span>
          </div>

        </div>
      </section>

      {/* Popular Dining Choices */}
      <section className="py-20 bg-[#181512] border-t border-b border-[#C9A86A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9A86A] block mb-2">
              DISCOVER BY CATEGORY
            </span>
            <h2 className="font-serif text-3xl text-[#F4EFE7]">Popular Dining Choices</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "BBQ & GRILL", title: "BBQ & Grill", image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=400&auto=format&fit=crop" },
              { id: "CHINESE", title: "Chinese Dishes", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=400&auto=format&fit=crop" },
              { id: "KARAHI & HANDI", title: "Karahi & Handi", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=400&auto=format&fit=crop" },
              { id: "BURGERS & SANDWICHES", title: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop" },
              { id: "SEAFOOD", title: "Seafood", image: "https://images.unsplash.com/photo-1559742811-822863c46f83?q=80&w=400&auto=format&fit=crop" },
              { id: "RICE & BIRYANI", title: "Biryani & Rice", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop" },
              { id: "DESSERTS", title: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop" },
              { id: "BEVERAGES", title: "Beverages", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&auto=format&fit=crop" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  scrollToSection("menu");
                }}
                className="relative h-36 rounded-sm overflow-hidden group border border-[#C9A86A]/20 focus:outline-none"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent" />
                <div className="absolute bottom-3 left-3 text-left">
                  <p className="font-serif text-sm font-bold text-[#F4EFE7] group-hover:text-[#C9A86A] transition-colors">
                    {cat.title}
                  </p>
                  <span className="text-[10px] text-[#C9A86A] uppercase tracking-widest">
                    Explore →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rating */}
      <section className="py-20 bg-[#111111] text-center border-b border-[#C9A86A]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center space-x-1 text-[#C9A86A] mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#C9A86A" />
            ))}
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#F4EFE7] mb-2">
            4.7 / 5.0
          </h2>
          <p className="text-sm font-semibold tracking-widest text-[#C9A86A] uppercase mb-4">
            5,900+ Google Reviews Reference
          </p>
          <p className="text-[#D8C7AD]/80 text-base font-light max-w-xl mx-auto mb-8">
            Discover what guests are saying about Quilim Restaurant in Faisalabad.
          </p>
          <a
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#111111] bg-[#C9A86A] hover:bg-[#D8C7AD] transition-colors rounded-sm"
          >
            <span>View Google Reviews</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 bg-[#181512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9A86A] block mb-2">
              VISUAL MOMENTS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F4EFE7]">
              Restaurant Gallery
            </h2>
            <p className="text-[#D8C7AD]/70 text-sm mt-3 font-light">
              Explore our food presentation, barbecue setups, and guest ambience.
            </p>
          </div>

          {/* Gallery Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["ALL", "FOOD", "BBQ", "PLATTERS", "DRINKS", "AMBIENCE"].map((filter) => (
              <button
                key={filter}
                onClick={() => setGalleryFilter(filter)}
                className={`px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all border ${
                  galleryFilter === filter
                    ? "bg-[#C9A86A] text-[#111111] border-[#C9A86A] font-bold"
                    : "bg-[#111111] text-[#D8C7AD]/70 border-[#C9A86A]/20 hover:text-[#F4EFE7]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {filteredGallery.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="relative h-64 rounded-sm overflow-hidden border border-[#C9A86A]/20 cursor-pointer group"
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-xs font-bold text-[#C9A86A] uppercase tracking-wider">{img.category}</p>
                  <p className="font-serif text-sm text-[#F4EFE7]">{img.title}</p>
                  <p className="text-[10px] text-[#D8C7AD]/80 mt-1">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#111111]/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-[#F4EFE7] hover:text-[#C9A86A] p-2"
          >
            <X size={32} />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredGallery.length - 1))
            }
            className="absolute left-4 text-[#F4EFE7] hover:text-[#C9A86A] p-2 bg-[#181512]/60 rounded-full"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="max-w-4xl max-h-[85vh] text-center">
            <img
              src={filteredGallery[lightboxIndex].image}
              alt={filteredGallery[lightboxIndex].title}
              className="max-h-[70vh] mx-auto rounded-sm border border-[#C9A86A]/30 object-contain"
            />
            <h3 className="font-serif text-xl text-[#F4EFE7] mt-4">
              {filteredGallery[lightboxIndex].title}
            </h3>
            <p className="text-xs text-[#D8C7AD]/80 mt-1">
              {filteredGallery[lightboxIndex].caption}
            </p>
          </div>

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev < filteredGallery.length - 1 ? prev + 1 : 0))
            }
            className="absolute right-4 text-[#F4EFE7] hover:text-[#C9A86A] p-2 bg-[#181512]/60 rounded-full"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}

      {/* Reservation */}
      <section id="reservation" className="py-24 bg-[#111111] border-t border-[#C9A86A]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#181512] rounded-sm border border-[#C9A86A]/20 p-8 sm:p-12 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9A86A] block mb-2">
                TABLE RESERVATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EFE7]">
                Your Table Awaits
              </h2>
              <p className="text-xs text-[#D8C7AD]/70 mt-2">
                Submit your table preferences or call us directly at {BUSINESS_INFO.phonePrimary}.
              </p>
            </div>

            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D8C7AD] mb-2 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reservationData.name}
                    onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full bg-[#111111] border border-[#C9A86A]/20 rounded-sm p-3 text-xs text-[#F4EFE7] focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D8C7AD] mb-2 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={reservationData.phone}
                    onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                    placeholder="03XX-XXXXXXX"
                    className="w-full bg-[#111111] border border-[#C9A86A]/20 rounded-sm p-3 text-xs text-[#F4EFE7] focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D8C7AD] mb-2 font-medium">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    value={reservationData.date}
                    onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
                    className="w-full bg-[#111111] border border-[#C9A86A]/20 rounded-sm p-3 text-xs text-[#F4EFE7] focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D8C7AD] mb-2 font-medium">
                    Preferred Time & Guests
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="time"
                      value={reservationData.time}
                      onChange={(e) => setReservationData({ ...reservationData, time: e.target.value })}
                      className="bg-[#111111] border border-[#C9A86A]/20 rounded-sm p-3 text-xs text-[#F4EFE7] focus:outline-none focus:border-[#C9A86A]"
                    />
                    <select
                      value={reservationData.guests}
                      onChange={(e) => setReservationData({ ...reservationData, guests: e.target.value })}
                      className="bg-[#111111] border border-[#C9A86A]/20 rounded-sm p-3 text-xs text-[#F4EFE7] focus:outline-none focus:border-[#C9A86A]"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8+">8+ Guests (Family)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D8C7AD] mb-2 font-medium">
                  Special Instructions / Requests
                </label>
                <textarea
                  rows={3}
                  value={reservationData.notes}
                  onChange={(e) => setReservationData({ ...reservationData, notes: e.target.value })}
                  placeholder="Seating preferences, high tea setup, birthday arrangements..."
                  className="w-full bg-[#111111] border border-[#C9A86A]/20 rounded-sm p-3 text-xs text-[#F4EFE7] focus:outline-none focus:border-[#C9A86A]"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#C9A86A]/10">
                <a
                  href={`tel:${BUSINESS_INFO.phonePrimaryRaw}`}
                  className="text-xs text-[#C9A86A] hover:underline flex items-center space-x-2"
                >
                  <Phone size={14} />
                  <span>Call to Reserve: {BUSINESS_INFO.phonePrimary}</span>
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#111111] bg-[#C9A86A] hover:bg-[#D8C7AD] transition-all rounded-sm shadow-lg"
                >
                  Request A Table
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Reservation Submission Modal */}
      {reservationSubmitted && (
        <div className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181512] border border-[#C9A86A]/40 rounded-sm p-8 max-w-md w-full text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#C9A86A] mx-auto" />
            <h3 className="font-serif text-xl text-[#F4EFE7]">Reservation Request Received</h3>
            <p className="text-xs text-[#D8C7AD]/80 leading-relaxed">
              Thank you. This is a concept reservation form. Please contact Quilim Restaurant directly at <strong className="text-[#C9A86A]">{BUSINESS_INFO.phonePrimary}</strong> or <strong className="text-[#C9A86A]">{BUSINESS_INFO.phoneAlt}</strong> to confirm your booking.
            </p>
            <button
              onClick={() => setReservationSubmitted(false)}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-widest text-[#111111] bg-[#C9A86A] rounded-sm"
            >
              Close Notice
            </button>
          </div>
        </div>
      )}

      {/* Visit */}
      <section id="visit" className="py-24 bg-[#181512] border-t border-[#C9A86A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Info */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9A86A] block">
                LOCATION & HOURS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#F4EFE7]">
                Come Dine With Us
              </h2>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-[#C9A86A] w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#F4EFE7] tracking-wider">Address</h4>
                    <p className="text-xs text-[#D8C7AD]/80 mt-1 leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-[#C9A86A] w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#F4EFE7] tracking-wider">Phone Numbers</h4>
                    <p className="text-xs text-[#D8C7AD]/80 mt-1">
                      Primary: <a href={`tel:${BUSINESS_INFO.phonePrimaryRaw}`} className="text-[#C9A86A] hover:underline">{BUSINESS_INFO.phonePrimary}</a>
                    </p>
                    <p className="text-xs text-[#D8C7AD]/80 mt-0.5">
                      Alternate: <a href={`tel:${BUSINESS_INFO.phoneAltRaw}`} className="text-[#C9A86A] hover:underline">{BUSINESS_INFO.phoneAlt}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="text-[#C9A86A] w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#F4EFE7] tracking-wider">Opening Hours</h4>
                    <p className="text-xs text-[#D8C7AD]/80 mt-1">{BUSINESS_INFO.openingHours}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={`tel:${BUSINESS_INFO.phonePrimaryRaw}`}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#111111] bg-[#C9A86A] hover:bg-[#D8C7AD] transition-colors rounded-sm inline-flex items-center space-x-2"
                >
                  <Phone size={14} />
                  <span>Call Now</span>
                </a>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#F4EFE7] border border-[#C9A86A]/40 hover:bg-[#C9A86A]/10 transition-colors rounded-sm inline-flex items-center space-x-2"
                >
                  <Navigation size={14} />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Simulated Interactive Map Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#111111] border border-[#C9A86A]/20 p-6 rounded-sm space-y-4">
                <div className="h-64 bg-[#181512] rounded-sm relative overflow-hidden flex items-center justify-center border border-[#C9A86A]/10">
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop"
                    alt="Map Location Map View"
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute text-center p-4">
                    <MapPin className="w-10 h-10 text-[#C9A86A] mx-auto mb-2 animate-bounce" />
                    <p className="font-serif text-lg text-[#F4EFE7]">Quilim Restaurant</p>
                    <p className="text-[11px] text-[#D8C7AD]/70">People's Colony No. 1, Faisalabad</p>
                    <a
                      href={BUSINESS_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#111111] bg-[#C9A86A] rounded-sm"
                    >
                      Open In Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C9A86A] block mb-2">
              GET IN TOUCH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EFE7]">Send A Message</h2>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-6 bg-[#181512] p-8 rounded-sm border border-[#C9A86A]/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D8C7AD] mb-2 font-medium">Name *</label>
                <input
                  type="text"
                  required
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-[#111111] border border-[#C9A86A]/20 rounded-sm p-3 text-xs text-[#F4EFE7] focus:outline-none focus:border-[#C9A86A]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D8C7AD] mb-2 font-medium">Phone *</label>
                <input
                  type="tel"
                  required
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  placeholder="Phone Number"
                  className="w-full bg-[#111111] border border-[#C9A86A]/20 rounded-sm p-3 text-xs text-[#F4EFE7] focus:outline-none focus:border-[#C9A86A]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D8C7AD] mb-2 font-medium">Email (Optional)</label>
                <input
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full bg-[#111111] border border-[#C9A86A]/20 rounded-sm p-3 text-xs text-[#F4EFE7] focus:outline-none focus:border-[#C9A86A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D8C7AD] mb-2 font-medium">Message *</label>
              <textarea
                rows={4}
                required
                value={contactData.message}
                onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                placeholder="Inquire about banquet booking, family hall availability, high tea details..."
                className="w-full bg-[#111111] border border-[#C9A86A]/20 rounded-sm p-3 text-xs text-[#F4EFE7] focus:outline-none focus:border-[#C9A86A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold uppercase tracking-widest text-[#111111] bg-[#C9A86A] hover:bg-[#D8C7AD] transition-all rounded-sm"
            >
              Send Message
            </button>
          </form>

          {contactSubmitted && (
            <div className="mt-4 p-4 bg-[#181512] border border-[#C9A86A]/40 text-center rounded-sm text-xs text-[#F4EFE7]">
              Thank you for your message. This is a concept contact form demo. Please call <strong>{BUSINESS_INFO.phonePrimary}</strong> for immediate queries.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-[#181512] overflow-hidden text-center border-t border-[#C9A86A]/20">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop"
            alt="BBQ Platter Feast"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F4EFE7] mb-4">
            Make Your Next Meal Memorable.
          </h2>
          <p className="text-[#D8C7AD]/80 text-sm max-w-xl mx-auto mb-8 font-light">
            Explore the menu, discover your favorites and experience Quilim in Faisalabad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => scrollToSection("menu")}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#111111] bg-[#C9A86A] rounded-sm"
            >
              Explore Menu
            </button>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#F4EFE7] border border-[#C9A86A]/50 rounded-sm"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] border-t border-[#C9A86A]/15 py-16 text-[#D8C7AD]/70 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

            {/* Col 1 */}
            <div className="space-y-4">
              <span className="font-serif text-2xl font-bold text-[#F4EFE7] tracking-wider block">
                QUILIM
              </span>
              <p className="text-xs leading-relaxed text-[#D8C7AD]/70 font-light">
                {BUSINESS_INFO.category} in Faisalabad offering authentic barbecue, Chinese dishes, karahi handi, steaks, and signature platters.
              </p>
              <div className="inline-block px-3 py-1 bg-[#181512] border border-[#C9A86A]/20 rounded-sm text-[10px] text-[#C9A86A] uppercase tracking-widest">
                Concept Website • Demo Design
              </div>
            </div>

            {/* Col 2 Quick Links */}
            <div>
              <h4 className="font-serif text-sm font-bold text-[#F4EFE7] uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About", "Menu", "Deals", "Gallery", "Visit Us", "Contact"].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection(link.toLowerCase().replace(" ", ""))}
                      className="hover:text-[#C9A86A] transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 Contact Details */}
            <div>
              <h4 className="font-serif text-sm font-bold text-[#F4EFE7] uppercase tracking-wider mb-4">Contact Info</h4>
              <p className="mb-2">
                Primary: <a href={`tel:${BUSINESS_INFO.phonePrimaryRaw}`} className="text-[#C9A86A] hover:underline">{BUSINESS_INFO.phonePrimary}</a>
              </p>
              <p className="mb-2">
                Alternate: <a href={`tel:${BUSINESS_INFO.phoneAltRaw}`} className="text-[#C9A86A] hover:underline">{BUSINESS_INFO.phoneAlt}</a>
              </p>
              <p className="text-[11px] leading-relaxed text-[#D8C7AD]/60 mt-3">
                {BUSINESS_INFO.shortAddress}
              </p>
            </div>

            {/* Col 4 Hours */}
            <div>
              <h4 className="font-serif text-sm font-bold text-[#F4EFE7] uppercase tracking-wider mb-4">Opening Hours</h4>
              <p className="text-[#F4EFE7] font-semibold">DAILY</p>
              <p className="text-xs text-[#D8C7AD]/80 mt-1">11:00 AM – 12:00 AM</p>
              <p className="text-[10px] text-[#D8C7AD]/50 mt-4">
                Google Rating: 4.7 / 5 (5,900+ reviews reference)
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-[#C9A86A]/10 text-center flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#D8C7AD]/50 gap-2">
            <p>© 2026 Quilim Restaurant — Concept Website</p>
            <p className="italic">Designed as a high-end agency client demo proposal.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
