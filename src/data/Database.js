import mobile from '../Images/image1.jpg';
import sources from '../Images/image2.jpg';
import cards from '../Images/image3.jpg';
import imago from '../Images/image5.jpg';
import tango from '../Images/image6.jpg';
import sango from '../Images/image7.jpg';
import mango from '../Images/image8.jpg';

export const portfolioData = [
    {
        id: 1,
        name: "Whispers of Nature",
        artist: "Muhammad Hassan",
        price: 249.99,
        rating: 4.6,
        reviewCount: 98,
        inStock: true,
        image: mobile,
        description:
            "A tranquil artwork inspired by the subtle harmony of nature. Designed to evoke calmness and balance, perfect for modern interiors.",
        features: [
            "Museum-Quality Canvas",
            "Fade-Resistant Inks",
            "Hand-Stretched Frame",
            "Ready to Hang"
        ],
        specifications: {
            Medium: "Cotton Canvas",
            Dimensions: '18" × 24"',
            Technique: "Digital Illustration Print",
            Edition: "Open Edition",
            Signed: "No"
        },
        tech: ["Nature", "Illustration", "Minimal"]
    },

    {
        id: 2,
        name: "Echoes of the Highlands",
        artist: "Ayesha Aqeel",
        price: 299.99,
        rating: 4.8,
        reviewCount: 132,
        inStock: true,
        image: sources,
        description:
            "A serene landscape capturing the soulful silence of highlands and rolling hills under soft light.",
        features: [
            "Premium Canvas",
            "UV Protection Coating",
            "Solid Wood Frame",
            "Certificate of Authenticity"
        ],
        specifications: {
            Medium: "Premium Canvas",
            Dimensions: '24" × 36"',
            Technique: "Giclée Printing",
            Edition: "Limited Edition of 150",
            Signed: "Yes"
        },
        tech: ["Nature", "Serene", "Landscape Art"]
    },

    {
        id: 3,
        name: "Textured Silence",
        artist: "Seemal Rubab",
        price: 219.99,
        rating: 4.5,
        reviewCount: 76,
        inStock: false,
        image: cards,
        description:
            "An abstract composition that speaks through textures, layers, and quiet emotion.",
        features: [
            "High-Resolution Print",
            "Matte Finish",
            "Hand-Assembled Frame"
        ],
        specifications: {
            Medium: "Textured Paper Canvas",
            Dimensions: '20" × 20"',
            Technique: "Abstract Digital Print",
            Edition: "Open Edition",
            Signed: "No"
        },
        tech: ["Abstract Art", "Modern", "Texture"]
    },

    {
        id: 4,
        name: "Fading Petals",
        artist: "Khydija Fatima",
        price: 189.99,
        rating: 4.4,
        reviewCount: 64,
        inStock: true,
        image: tango,
        description:
            "A soft floral artwork symbolizing impermanence and gentle beauty through minimal composition.",
        features: [
            "Fine Art Paper",
            "Soft Color Palette",
            "Lightweight Frame"
        ],
        specifications: {
            Medium: "Fine Art Paper",
            Dimensions: '16" × 20"',
            Technique: "Minimal Art Print",
            Edition: "Open Edition",
            Signed: "No"
        },
        tech: ["Floral", "Calm Aesthetic", "Minimal Art"]
    },

    {
        id: 5,
        name: "Masks of Emotion",
        artist: "Hafsa Amin",
        price: 329.99,
        rating: 4.9,
        reviewCount: 180,
        inStock: true,
        image: imago,
        description:
            "A powerful expressionist piece portraying hidden emotions through theatrical symbolism.",
        features: [
            "Gallery-Grade Canvas",
            "Bold Color Accuracy",
            "Certificate of Authenticity"
        ],
        specifications: {
            Medium: "Canvas",
            Dimensions: '24" × 30"',
            Technique: "Expressionist Print",
            Edition: "Limited Edition of 75",
            Signed: "Yes"
        },
        tech: ["Expressionism", "Theatre Masks", "Abstract Art"]
    },

    {
        id: 6,
        name: "City After Dusk",
        artist: "Javeria Yasin",
        price: 279.99,
        rating: 4.7,
        reviewCount: 110,
        inStock: true,
        image: sango,
        description:
            "An urban nightscape capturing the quiet mystery and mood of city life after sunset.",
        features: [
            "High-Contrast Print",
            "Durable Frame",
            "UV Resistant"
        ],
        specifications: {
            Medium: "Canvas",
            Dimensions: '20" × 30"',
            Technique: "Fine Art Print",
            Edition: "Limited Edition of 120",
            Signed: "Yes"
        },
        tech: ["Urban Canvas", "Fine Art", "Moody"]
    },

    {
        id: 7,
        name: "Silent Majesty",
        artist: "Muhammad Saad Amin",
        price: 349.99,
        rating: 5.0,
        reviewCount: 210,
        inStock: true,
        image: mango,
        description:
            "A striking conceptual portrait that reflects power, silence, and depth in human expression.",
        features: [
            "Museum-Grade Materials",
            "Archival Inks",
            "Hand-Signed"
        ],
        specifications: {
            Medium: "Premium Canvas",
            Dimensions: '24" × 36"',
            Technique: "Concept Art Print",
            Edition: "Limited Edition of 50",
            Signed: "Yes"
        },
        tech: ["Concept Art", "Portrait", "Canvas"]
    }
];