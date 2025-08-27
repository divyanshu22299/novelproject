const mongoose = require("mongoose");
require("dotenv").config();
const Client = require("./models/Client");

const clientData = [
  { name: "HIRA", logo: "https://www.hiragroup.com/wp-content/uploads/2025/06/hira-logo1.png", status: "active", industry:"Manufacturing", credentials:12, teamSize:45, description:"Leading manufacturer of engineering components." },
  { name: "MITTAL", logo: "https://upload.wikimedia.org/wikipedia/commons/d/da/Mittal_Steel_Company_logo.svg", status: "active", industry:"Steel", credentials:8, teamSize:28, description:"Global steel producer." },
  { name: "RAKESH MASALA", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk483ktaHhPDLoEq-pELZwTFrXTNo-vrlINg&s", status: "inactive", industry:"Food", credentials:6, teamSize:32, description:"Premium spices and masala products." },
  { name: "SAGAR", logo: "https://www.sagarmanufacturers.com/assets/web/images/smpl-new-logo.png", status: "pending", industry:"Textiles", credentials:5, teamSize:18, description:"Textile manufacturing and retail." },
  { name: "SIMPLEX", logo: "https://www.simplexcastings.com/public/asset/images/logo/Simplex-casting-logo.png", status: "active", industry:"Castings", credentials:15, teamSize:52, description:"Metal casting and industrial solutions." },
  { name: "SONA", logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDu6ftlen7ebSW3cGdsWx0j_oszKQT_sOSxw&s", status:"active", industry:"Automotive", credentials:10, teamSize:40, description:"Automobile components manufacturer." },
  { name: "PACIFIC", logo:"https://res.cloudinary.com/dmabeivkl/image/upload/v1614250738/logo/alhsbysjckedohrmzgss.jpg", status:"active", industry:"Logistics", credentials:8, teamSize:22, description:"Logistics and transportation services." },
  { name: "SUBHASH SAREES", logo:"https://www.yellowsky.in/image/catalog/products/subhash_sarees/work%20logo.png", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
  { name: "SUDIVA", logo:"https://www.sudivaindia.com/design_img/logo.png", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
  { name: "TS-TECH", logo:"https://companieslogo.com/img/orig/7313.T_BIG-06141606.png?t=1720244490", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
  { name: "VELNIK", logo:"https://velnik.com/Images/footer-logo.png", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
  { name: "BIDHATA", logo:"https://www.bidhata.com/wp-content/uploads/2022/10/bidhata.png", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
  { name: "KRN", logo:"https://krnheatexchanger.com/wp-content/uploads/2025/02/LOGO-KRN-NEW-scaled.jpg", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
  { name: "OSTWAL", logo:"https://www.ostwal.in/img/logo/logo.png", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
  { name: "RBL", logo:"https://www.sap.com/dam/application/shared/logos/customer/r-z/rajasthan-barytes-limited-customer-logo.png", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
  { name: "SWARAJ", logo:"https://www.swarajsuiting.com/images/SSL_Logo_2.png", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
  { name: "PODAR", logo:"https://vectorseek.com/wp-content/uploads/2025/05/Poddar-Fashion-Footwear-Logo-PNG-Vector.png", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
  { name: "RS PRINT", logo:"https://www.rsprint.co.uk/wp-content/themes/rs-print/images/rs-print-logo.webp", status:"pending", industry:"Textiles", credentials:7, teamSize:15, description:"Saree manufacturing and retail." },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected for seeding...");
    await Client.deleteMany(); // clear existing clients
    await Client.insertMany(clientData); // insert all clients
    console.log("Database seeded successfully!");
    mongoose.connection.close();
  })
  .catch(err => console.log("Seeding error:", err));
