import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search, Star, Car, Fuel, Users, X, MapPin, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

const carouselItems = [
  {
    id: 2,
    title: "Find your perfect match!",
    image: "https://i.pinimg.com/564x/c8/8f/be/c88fbe77a159916b106a7b7701dceaa9.jpg",
  },
  {
    id: 3,
    title: "Drive into luxury!",
    image: "https://i.pinimg.com/564x/fb/45/8b/fb458b377c9b8b8026d507cbfc88460f.jpg",
  },
  {
    id: 4,
    title: "Unique Cars for Unique Individuals!",
    image: "https://i.pinimg.com/564x/99/b3/6f/99b36f188456d5803af49264c373e23d.jpg",
  },
]

const logos = [
  { name: 'Maruti Suzuki', logo: 'https://i.pinimg.com/564x/80/0d/e2/800de2b4b41959f70be86e6c7454272c.jpg' },
  { name: 'Hyundai', logo: 'https://i.pinimg.com/564x/28/7c/4e/287c4e8a85379f2f8be2558f25bb04d1.jpg' },
  { name: 'Tata', logo: 'https://i.pinimg.com/564x/08/cc/c9/08ccc9d69f4b03e923c676c2a4822010.jpg' },
  { name: 'Mahindra', logo: 'https://i.pinimg.com/564x/be/d8/95/bed895c865a5c777452f22528da075ad.jpg' },
  { name: 'Toyota', logo: 'https://i.pinimg.com/564x/5f/31/43/5f3143a273dd854adfb9ec5fd8c185df.jpg' },
  { name: 'Kia', logo: 'https://i.pinimg.com/564x/b6/31/b7/b631b7dd261b8bc31d9168988b245fc8.jpg' },
  { name: 'Honda', logo: 'https://i.pinimg.com/564x/0b/f4/f3/0bf4f346b871684d0c407deb488e287a.jpg' },
  { name: 'MG', logo: 'https://i.pinimg.com/564x/4f/4e/44/4f4e449638357ea884a2c65ffed2f486.jpg' },
  { name: 'Renault', logo: 'https://i.pinimg.com/564x/4b/58/da/4b58da0ffeafd9b2a0c5326f228543ee.jpg' },
  { name: 'Volkswagen', logo: 'https://i.pinimg.com/564x/bb/15/29/bb152936c727e607711d7ea276cbc6d3.jpg' },
  { name: 'Skoda', logo: 'https://i.pinimg.com/564x/8e/74/79/8e74797514263c201bd31eac942ae7b4.jpg' },
  { name: 'Nissan', logo: 'https://i.pinimg.com/564x/d9/3a/e4/d93ae4c990f9b91391060feb9c01e151.jpg' },
  { name: 'Citroen', logo: 'https://i.pinimg.com/564x/c1/5d/75/c15d752abb0259e6b2dc130e85df50d8.jpg' },
  { name: 'Jeep', logo: 'https://i.pinimg.com/564x/73/ce/c1/73cec10db0311207b5028b25e194b80c.jpg' },
  { name: 'Aston Martin', logo: 'https://i.pinimg.com/564x/8c/1e/5f/8c1e5f4340f124d095541636e4dcb5c9.jpg' },
  { name: 'Audi', logo: 'https://i.pinimg.com/564x/26/9a/ec/269aec6bc2ac6381bf47b78819748aa1.jpg'},
]

const carData = {
  SUV: [
    { name: 'Mahindra Thar ROXX', price: '₹ 12.99 - 22.49 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg', link: '/deals/defender' },
    { name: 'Tata Nexon', price: '₹ 8 - 15.50 Lakh', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg', link: '/deals/rangerover' },
    { name: 'Mahindra Thar', price: ' ₹ 11.35 - 17.60 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Thar/10745/1697697308167/front-left-side-47.jpg', link: '/deals/defender' },
    { name: 'Tata Curvv', price: '₹ 10 - 19 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Curvv/9578/1723033064164/front-left-side-47.jpg' }
  ],
  Luxury: [
    { name: 'Mercedes-Benz GLA', price: '₹ 51.75 - 58.15 Lakh', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mercedes-Benz/GLA-2024/9731/1679039244149/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Kia EV6', price: '₹ 60.97 - 65.97 Lakh', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Kia/EV6/8947/1654159762071/front-left-side-47.jpg', link: '/deals/ev6' },
    { name: 'Land Rover Defender', price: '₹ 1.04 - 1.57 Cr*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Defender/9081/Land-Rover-Defender-3.0-Diesel-110-X-Dynamic-HSE/1720674556929/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Land Rover Range Rover', price: ' ₹ 2.36 - 4.98 Cr*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Range-Rover/11540/1719037980777/front-left-side-47.jpg', link: '/deals/ev6' }
  ],
  MUV: [
    { name: 'Maruti Ertiga', price: 'Rs8.69 - 13.03 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Ertiga/10293/1697697779799/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Toyota Innova Crysta', price: 'Rs19.99 - 26.30 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Innova-Crysta/9612/1697698611076/front-left-side-47.jpg', link: '/deals/ev6' },
    { name: 'Renault Triber', price: '₹ Rs6 - 8.97 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Renault/Triber/10066/1717586026066/front-left-side-47.jpg', link: '/deals/gla' },
    { name: 'Maruti XL6', price: '₹ 11.61 - 14.77 Lakh*', image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/XL6/10384/1688385191052/front-left-side-47.jpg', link: '/deals/ev6' }
  ]
}

const brandModels = {
  'Maruti Suzuki': ['Swift', 'Baleno', 'Dzire', 'Alto', 'Wagon R', 'Vitara Brezza', 'Ertiga', 'S-Presso', 'Celerio', 'Ignis'],
  'Hyundai': ['i20', 'Creta', 'Venue', 'Verna', 'Grand i10', 'Aura', 'Alcazar', 'Kona Electric', 'Tucson', 'Santro'],
  'Tata': ['Nexon', 'Altroz', 'Harrier', 'Tiago', 'Punch', 'Safari', 'Tigor', 'Nexon EV', 'Tiago EV', 'Hexa'],
  'Mahindra': ['XUV700', 'Thar', 'Scorpio', 'XUV300', 'Bolero', 'Marazzo', 'KUV100', 'Alturas G4', 'e-Verito', 'TUV300'],
  'Toyota': ['Fortuner', 'Innova Crysta', 'Glanza', 'Urban Cruiser', 'Camry', 'Vellfire', 'Yaris', 'Land Cruiser', 'Prius'],
  'Kia': ['Seltos', 'Sonet', 'Carnival', 'EV6', 'Carens'],
  'Honda': ['City', 'Amaze', 'WR-V', 'Jazz', 'Civic', 'CR-V'],
  'MG': ['Hector', 'ZS EV', 'Gloster', 'Astor', 'Hector Plus'],
  'Renault': ['Kwid', 'Triber', 'Kiger', 'Duster'],
  'Volkswagen': ['Polo', 'Vento', 'Taigun', 'T-Roc', 'Tiguan'],
  'Skoda': ['Octavia', 'Superb', 'Kushaq', 'Rapid', 'Kodiaq'],
  'Nissan': ['Magnite', 'Kicks', 'GT-R'],
  'Citroen': ['C5 Aircross', 'C3', 'eC3'],
  'Jeep': ['Compass', 'Wrangler', 'Meridian', 'Grand Cherokee'],
  'Aston Martin': ['DB11', 'Vantage', 'DBX', 'DBS'],
  'Audi': ['A4', 'Q5', 'A6', 'Q7', 'e-tron', 'RS Q8']
}

const modelVariants = {
  'Swift': ['LXi', 'VXi', 'ZXi', 'ZXi+', 'AMT'],
  'Baleno': ['Sigma', 'Delta', 'Zeta', 'Alpha', 'RS'],
  'Creta': ['E', 'EX', 'S', 'SX', 'SX(O)'],
  'Nexon': ['XE', 'XM', 'XZ', 'XZ+', 'XZ+ Lux'],
  'XUV700': ['MX', 'AX3', 'AX5', 'AX7', 'AX7 Luxury'],
  'Fortuner': ['4x2', '4x4', 'Legender'],
  'Seltos': ['HTE', 'HTK', 'HTK+', 'HTX', 'HTX+', 'GTX+'],
  'City': ['V', 'VX', 'ZX'],
  'Hector': ['Style', 'Super', 'Smart', 'Sharp'],
  'Kwid': ['RXE', 'RXL', 'RXT', 'Climber'],
  'Polo': ['Trendline', 'Comfortline', 'Highline Plus'],
  'Octavia': ['Ambition', 'Style', 'L&K'],
  'Magnite': ['XE', 'XL', 'XV', 'XV Premium'],
  'C5 Aircross': ['Feel', 'Shine'],
  'Compass': ['Sport', 'Longitude', 'Limited', 'Model S'],
  'DB11': ['V8', 'AMR'],
  'A4': ['Premium', 'Premium Plus', 'Technology']
}

const nagpurRTOCodes = ['MH-31', 'MH-40', 'MH-49']

const nagpurLocations = [
  "Dharampeth", "Sadar", "Sitabuldi", "Itwari", "Mahal", "Gandhibagh", "Nandanvan",
  "Lakadganj", "Ashi Nagar", "Mangalwari", "Nehru Nagar", "Hanuman Nagar", "Dhantoli",
  "Civil Lines", "Ramdaspeth", "Shankar Nagar", "Bajaj Nagar", "Pratap Nagar", "Jaripatka",
  "Nara", "Gorewada", "Mankapur", "Koradi", "Hingna", "Wadi", "Khamla", "Sonegaon", "Besa"
]

const isValidCarNumber = (number) => {
  const regex = /^[A-Z]{2}[ -]?[0-9]{1,2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$/;
  return regex.test(number.toUpperCase());
};

const calculateSuggestedPrice = (formData) => {
  let basePrice = 500000; // Base price of 5 lakhs

  // Adjust price based on brand
  const brandMultiplier = {
    'Maruti Suzuki': 1,
    'Hyundai': 1.1,
    'Tata': 1.05,
    'Mahindra': 1.15,
    'Toyota': 1.3,
    'Honda': 1.2,
    // Add more brands as needed
  };
  basePrice *= brandMultiplier[formData.brand] || 1;

  // Adjust price based on year
  const currentYear = new Date().getFullYear();
  const age = currentYear - parseInt(formData.year);
  basePrice *= Math.max(0.5, 1 - (age * 0.05)); // Depreciate by 5% per year, minimum 50% of base price

  // Adjust price based on kilometers driven
  const kmsDriven = parseInt(formData.kms);
  basePrice *= Math.max(0.5, 1 - (kmsDriven / 100000 * 0.1)); // Reduce by 10% per 100,000 km, minimum 50% of current price

  // Round to nearest thousand
  return Math.round(basePrice / 1000) * 1000;
}

export function NewCars() {
  const [visibleBrands, setVisibleBrands] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Luxury')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    carNumber: '',
    brand: '',
    year: '',
    model: '',
    variant: '',
    regState: '',
    kms: '',
    customerName: '',
    customerEmail: '',
    ownerName: '',
    carLocation: '',
    phone: '',
    sellingTimeline: '',
    whatsappUpdates: false,
    carImages: [null, null, null, null],
    rcNumber: '',
    rcImage: null,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBrands, setFilteredBrands] = useState(logos)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [filteredModels, setFilteredModels] = useState([])
  const [selectedModel, setSelectedModel] = useState('')
  const [filteredVariants, setFilteredVariants] = useState([])
  const [showThankYou, setShowThankYou] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [rcUploaded, setRcUploaded] = useState(false)
  const [insuranceDetails, setInsuranceDetails] = useState({
    provider: '',
    expiryDate: '',
    type: 'Comprehensive'
  })
  const [showEditMessage, setShowEditMessage] = useState(false);
  const [carImages, setCarImages] = useState([null, null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carImagesUploaded, setCarImagesUploaded] = useState(false);
  const [rcImageUploaded, setRcImageUploaded] = useState(false);
  const [formError, setFormError] = useState('');
  const [carImagePreviews, setCarImagePreviews] = useState([null, null, null, null]);
  const [rcImagePreview, setRcImagePreview] = useState(null);

  useEffect(() => {
    console.log("Component mounted");
    setIsMounted(true)
    const timer = setTimeout(() => {
      console.log("Opening modal");
      setIsModalOpen(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    console.log("Visible brands:", visibleBrands);
    const timer = setInterval(() => {
      setVisibleBrands((prev) => {
        if (prev.length < logos.length) {
          const newBrands = [...prev, logos[prev.length]];
          console.log("Updated visible brands:", newBrands);
          return newBrands;
        }
        return prev
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (formData.brand && formData.year && formData.kms) {
      const suggestedPrice = calculateSuggestedPrice(formData);
      setFormData(prevData => ({ ...prevData, sellingPrice: suggestedPrice.toString() }));
    }
  }, [formData.brand, formData.year, formData.kms]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'sellingPrice') {
      setShowEditMessage(true);
      return;
    }
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (name === 'brand') {
      setSelectedBrand(value)
      setFilteredModels(brandModels[value] || [])
      setFilteredVariants([])
    } else if (name === 'model') {
      setSelectedModel(value)
      setFilteredVariants(modelVariants[value] || [])
    } else if (name === 'carNumber') {
      // Car number validation is now handled in the render method
    } else if (name === 'sellingPrice') {
      const price = parseInt(value)
      if (price > 10000000) {
        setFormData(prevData => ({ ...prevData, sellingPrice: '10000000' }))
      }
    } else if (name === 'kms' || name === 'year') {
      // When kilometers or year is updated, calculate and set the suggested price
      setFormData(prevData => {
        const updatedData = { ...prevData, [name]: value };
        const suggestedPrice = calculateSuggestedPrice(updatedData);
        return { ...updatedData, sellingPrice: suggestedPrice.toString() };
      });
    }
  }

  const handleRCUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prevData => ({
        ...prevData,
        rcImage: file
      }));
      setRcUploaded(true);
      setRcImageUploaded(true);

      // Preview image
      const reader = new FileReader();
      reader.onload = (event) => {
        setRcImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setRcUploaded(false);
      setRcImageUploaded(false);
    }
  };

  const handleInsuranceChange = (e) => {
    const { name, value } = e.target
    setInsuranceDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }))
  }

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...carImages];
      newImages[index] = file;
      setCarImages(newImages);
      setCarImagesUploaded(newImages.some(img => img !== null));

      // Preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPreviews = [...carImagePreviews];
        newPreviews[index] = e.target.result;
        setCarImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormError('');

    try {
      const formDataToSend = new FormData();

      // Append all form data except images
      Object.keys(formData).forEach((key) => {
        if (key !== 'carImages' && key !== 'rcImage') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append car images
      carImages.forEach((image, index) => {
        if (image) {
          formDataToSend.append(`carImages`, image);
        }
      });

      // Append RC image
      if (formData.rcImage) {
        formDataToSend.append('rcImage', formData.rcImage);
      }

      // Append insurance details
      Object.keys(insuranceDetails).forEach((key) => {
        formDataToSend.append(`insurance_${key}`, insuranceDetails[key]);
      });

      if (!carImagesUploaded || !rcImageUploaded) {
        throw new Error('Both car images and RC image are required.');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('http://localhost:3000/api/newCars/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create car');
      }

      const data = await response.json();
      console.log('Car created successfully:', data);
      toast.success('Car created successfully!');
      setShowThankYou(true);
      // Reset form or navigate to a different page
    } catch (error) {
      console.error('Error creating car:', error);
      setFormError(error.message || 'Failed to create car');
      toast.error(error.message || 'Failed to create car');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    if (!carImagesUploaded) {
      setFormError('Please upload at least one car image.');
      return false;
    }
    if (!rcImageUploaded) {
      setFormError('Please upload the RC image.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = logos.filter(logo => logo.name.toLowerCase().includes(term))
    console.log("Filtered brands:", filtered);
    setFilteredBrands(filtered)
  }

  const handleBrandSelection = (brandName) => {
    console.log("Selected brand:", brandName);
    setSelectedBrand(brandName)
    const models = brandModels[brandName] || []
    console.log("Models for selected brand:", models);
    setFilteredModels(models)
    setFormData(prevData => ({ ...prevData, brand: brandName }))
    nextStep()
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const updateFormData = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }))
    nextStep()
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-lg w-full max-w-3xl shadow-2xl relative overflow-hidden"
            >
              <div className="flex flex-col h-full max-h-[90vh]">
                <div className="flex items-center p-4 border-b bg-orange-600 text-white">
                  <button onClick={prevStep} className="p-2" disabled={step === 1}>
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h1 className="flex-1 text-center text-lg font-medium">
                    {step === 1 ? 'Enter your car details' : 'Sell Your Car'}
                  </h1>
                  <button onClick={() => setIsModalOpen(false)} className="p-2">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {formError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                      <strong className="font-bold">Error: </strong>
                      <span className="block sm:inline">{formError}</span>
                    </div>
                  )}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="relative">
                        <input
                          type="text"
                          name="carNumber"
                          placeholder="MH31AB1234"
                          value={formData.carNumber}
                          onChange={(e) => {
                            const value = e.target.value.toUpperCase();
                            setFormData(prevData => ({ ...prevData, carNumber: value }));
                          }}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-2xl text-center uppercase"
                          required
                        />
                        {!isValidCarNumber(formData.carNumber) && formData.carNumber && (
                          <p className="text-red-500 text-sm mt-1">Please enter a valid car number</p>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-4 text-center">Select your car brand</h3>
                        <input
                          type="text"
                          placeholder="Search brands"
                          value={searchTerm}
                          onChange={handleSearch}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                        />
                        <div className="grid grid-cols-4 gap-4">
                          {filteredBrands.map((brand) => (
                            <button
                              key={brand.name}
                              onClick={() => handleBrandSelection(brand.name)}
                              className="p-4 border rounded-lg flex flex-col items-center gap-2 hover:bg-gray-50"
                            >
                              <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain" />
                              <span className="text-xs text-center">{brand.name}</span>
                            </button>
                          ))}
                        </div></div>
                      </div>
                   
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="font-medium mb-4">Select manufacturing year</h3>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                      >
                        <option value="">Select Year</option>
                        {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={nextStep}
                        disabled={!formData.year}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="font-medium mb-4">Select Car Model</h3>
                      <select
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                      >
                        <option value="">Select Model</option>
                        {filteredModels.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          if (filteredVariants.length === 1) {
                            setFormData(prev => ({ ...prev, variant: filteredVariants[0] }))
                            nextStep()
                          } else {
                            nextStep()
                          }
                        }}
                        disabled={!formData.model}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <h3 className="font-medium mb-4">Select variant</h3>
                      {filteredVariants.length > 1 ? (
                        <>
                          <select
                            name="variant"
                            value={formData.variant}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                          >
                            <option value="">Select Variant</option>
                            {filteredVariants.map((variant) => (
                              <option key={variant} value={variant}>
                                {variant}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={nextStep}
                            disabled={!formData.variant}
                            className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                          >
                            Next
                          </button>
                        </>
                      ) : (
                        <div className="text-center">
                          <p className="mb-4">Variant automatically selected: {formData.variant}</p>
                          <button
                            onClick={nextStep}
                            className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 5 && (
                    <div>
                      <h3 className="font-medium mb-4">Select RTO Code</h3>
                      <select
                        name="regState"
                        value={formData.regState}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                      >
                        <option value="">Select RTO Code</option>
                        {nagpurRTOCodes.map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={nextStep}
                        disabled={!formData.regState}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 6 && (
                    <div>
                      <h3 className="font-medium mb-4">Kilometers driven</h3>
                      <input
                        type="range"
                        name="kms"
                        min="0"
                        max="200000"
                        step="1000"
                        value={formData.kms}
                        onChange={handleChange}
                        className="w-full"
                      />
                      <p className="text-center mt-2">{formData.kms} km</p>
                      <button
                        onClick={nextStep}
                        className="w-full mt-4 py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 7 && (
                    <div className="space-y-6">
                      <h3 className="font-medium mb-4">Upload RC (Registration Certificate)</h3>
                      <input
                        type="text"
                        name="rcNumber"
                        placeholder="Enter RC Number"
                        value={formData.rcNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                        required
                      />
                      <label htmlFor="rcImage">RC Image</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        id='rcImage'
                        onChange={handleRCUpload}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      />
                      {rcImagePreview && (
                        <img src={rcImagePreview} alt="RC" className="mt-4 max-w-full h-auto" />
                      )}
                      {rcUploaded && formData.rcNumber && (
                        <p className="text-green-500">RC uploaded and number registered successfully!</p>
                      )}
                      {(!rcUploaded || !formData.rcNumber) && (
                        <p className="text-red-500">Please upload your RC and enter the RC number to proceed</p>
                      )}
                      <button
                        onClick={nextStep}
                        disabled={!rcUploaded || !formData.rcNumber}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 8 && (
                    <div className="space-y-6">
                      <h3 className="font-medium mb-4">Upload Car Images</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[0, 1, 2, 3].map((index) => (
                          <div key={index} className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, index)}
                              className="hidden"
                              id={`carImage${index}`}
                            />
                            <label
                              htmlFor={`carImage${index}`}
                              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                            >
                              {carImagePreviews[index] ? (
                                <img src={carImagePreviews[index]} alt={`Car ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                              ) : (
                                <span className="text-gray-500">+ Add Image</span>
                              )}
                            </label>
                          </div>
                        ))}
                      </div>
                      {!carImagesUploaded && (
                        <p className="text-red-500">Please upload at least one car image</p>
                      )}
                      <button
                        onClick={nextStep}
                        disabled={!carImagesUploaded}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 9 && (
                    <div className="space-y-6">
                      <h3 className="font-medium mb-4">Insurance Details</h3>

                      {/* Insurance Provider Input */}
                      <input
                        type="text"
                        name="provider"
                        placeholder="Insurance Provider"
                        value={insuranceDetails.provider}
                        onChange={handleInsuranceChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      />

                      {/* Valid Date Input */}
                      <div className="mt-4">
                        <label htmlFor="expiryDate" className="font-medium block mb-2">
                          Valid Date
                        </label>
                        <input
                          type="date"
                          id="expiryDate"
                          name="expiryDate"
                          value={insuranceDetails.expiryDate}
                          onChange={handleInsuranceChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        />
                      </div>

                      {/* Insurance Type Dropdown */}
                      <select
                        name="type"
                        value={insuranceDetails.type}
                        onChange={handleInsuranceChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      >
                        <option value="">Select Type</option>
                        <option value="Comprehensive">Comprehensive</option>
                        <option value="Third Party">Third Party</option>
                      </select>

                      {/* Next Button */}
                      <button
                        onClick={() => {
                          if (
                            insuranceDetails.provider &&
                            insuranceDetails.expiryDate &&
                            insuranceDetails.type
                          ) {
                            nextStep(); // Proceed to the next step
                          } else {
                            alert("Please fill out all fields before proceeding."); // Show alert if fields are missing
                          }
                        }}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 mt-6"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 10 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Customer and Owner Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                            Customer Email
                          </label>
                          <input
                            type="email"
                            id="customerEmail"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                            Owner Name
                          </label>
                          <input
                            type="text"
                            id="ownerName"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (formData.customerName && formData.customerEmail && formData.ownerName) {
                            nextStep(); // Proceed to the next step
                          } else {
                            alert("Please fill out all fields before proceeding."); // Show alert if fields are missing
                          }
                        }}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 11 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Car Location</h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <label htmlFor="carLocation" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Car Location
                          </label>
                          <select
                            id="carLocation"
                            name="carLocation"
                            value={formData.carLocation}
                            onChange={handleChange}
                            className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          >
                            <option value="">Select a location</option>
                            {nagpurLocations.map((location) => (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (formData.carLocation) {
                            nextStep();
                          } else {
                            alert("Please select a car location before proceeding.");
                          }
                        }}
                        className="w-full py-3 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {step === 12 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 border-b pb-4">
                        <img
                          src={logos.find(logo => logo.name === selectedBrand)?.logo || "/placeholder.svg"}
                          alt={selectedBrand}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{`${selectedBrand}, ${formData.model}`}</h3>
                          <p className="text-sm text-gray-600">{`${formData.year} | ${formData.regState}`}</p>
                        </div>
                        <button className="ml-auto text-blue-600 text-sm" onClick={() => setStep(1)}>EDIT</button>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Enter your phone number</h3>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all mb-4"
                        />

                        <label className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                          <input
                            type="checkbox"
                            name="whatsappUpdates"
                            checked={formData.whatsappUpdates}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600"
                          />
                          Get instant updates from CarsNagpur on your WhatsApp
                        </label>

                        <button
                          onClick={nextStep}
                          className="w-full py-4 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                          GET CAR PRICE
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          We respect your privacy and your information is secure with us
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 13 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">When are you planning to sell your car?</h3>

                      {['Within this week', 'By next week', 'After 2 weeks', 'Just checking price'].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setFormData(prevData => ({ ...prevData, sellingTimeline: option }));
                          }}
                          className="w-full py-3 px-4 bg-white-600 text-black rounded-md font-medium border-solid border-2 border-black hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 mb-2"
                        >
                          {option}
                        </button>
                      ))}
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full py-4 px-4 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin inline-block mr-2" />
                            Submitting...
                          </>
                        ) : (
                          'Submit'
                        )}
                      </button>
                    </div>
                  )}
                  {showThankYou && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    >
                      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto relative">
                        {/* Close Button */}
                        <button
                          onClick={() => setShowThankYou(false)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        {/* Car Icon */}
                        <div className="flex justify-center items-center mb-6">
                          <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M3 13v-2c0-.9.1-1.7.3-2.5L5 5.7A3.6 3.6 0 017.6 4h8.8c1.5 0 2.9.8 3.6 2.2l1.8 2.8c.2.8.3 1.6.3 2.5v2c0 .6-.4 1-1 1h-1v2.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V14H6v2.5c0 .8-.7 1.5-1.5 1.5S3 17.3 3 16.5V14H2c-.6 0-1-.4-1-1zm2-2h16v-1.2l-1.8-2.8a1.6 1.6 0 00-1.4-.8H7.6c-.6 0-1.2.3-1.4.8L4.4 9.8V11zm13.5 6c.3 0 .5-.2.5-.5s-.2-.5-.5-.5-.5.2-.5.5.2.5.5.5zM4.5 17c.3 0 .5-.2.5-.5s-.2-.5-.5-.5-.5.2-.5.5.2.5.5.5z" />
                            </svg>
                          </div>
                        </div>

                        {/* Thank You Message */}
                        <h3 className="text-2xl font-bold text-orange-600 mb-4">Thank You!</h3>
                        <p className="text-gray-600">
                          Your car details have been successfully submitted. We appreciate your effort!
                        </p>
                        <p className="text-gray-600 mt-2">
                          Our team will get back to you shortly. Have a great day!
                        </p>

                        {/* Call to Action Button */}
                        <button
                          onClick={() => setShowThankYou(false)}
                          className="mt-6 py-2 px-6 bg-orange-600 text-white rounded-lg shadow-md font-medium hover:bg-blue-700 transition"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[330px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={item.image} alt={item.title} className="object-cover w-full h-full" />

            <div className="absolute inset-0 bg-black bg-opacity-50" />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 text-center">
                {item.title}
              </h1>

              <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-6 md:mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Explore by brand, model or budget"
                    className="w-full py-2 sm:py-3 px-4 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
                    <Search className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Browse cars by</h2>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                  {[
                    { icon: Star, text: 'Brands' },
                    { icon: Car, text: 'Body Type' },
                    { icon: Fuel, text: 'Fuel Type' },
                    { icon: Users, text: 'Seating Capacity' },
                  ].map((button, index) => (
                    <button
                      key={index}
                      className="flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
                    >
                      {React.createElement(button.icon, { className: 'w-4 h-4 sm:w-5 sm:h-5 mr-2' })}
                      {button.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
        </button>
      </div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Brands in the Spotlight</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={isMounted ? { opacity: 0, y: 20 } : false}
              animate={isMounted ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-slate-300 transition-shadow duration-300"
            >
              <img
                src={logo.logo}
                alt={`${logo.name} logo`}
                className="w-20 h-16 object-contain mb-2 transition-all duration-300"
              />
              <p className="text-sm font-medium text-center">{logo.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  
        <div className="p-8 bg-white">
          <h2 className="text-3xl font-bold text-center mb-6">Find Right Cars by Body Type</h2>
  
          <div className="flex justify-center space-x-6 mb-6">
            {Object.keys(carData).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-lg font-semibold px-4 py-2 ${
                  selectedCategory === category
                    ? 'text-orange-600 border-b-4 border-orange-600'
                    : 'text-gray-500 hover:text-gray-800'
  
                  }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
      
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {carData[selectedCategory].map((car, index) => (
                  <div
                    key={index}
                    className="bg-slate-200 p-4 rounded-lg shadow-xl hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-48 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-semibold">{car.name}</h3>
                      <p className="text-gray-600">{car.price}</p>
                      <a
                        href={car.link}
                        className="inline-block mt-4 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-colors duration-300 cursor-pointer"
                      >
                        View Deal
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      }
      
      export default NewCars