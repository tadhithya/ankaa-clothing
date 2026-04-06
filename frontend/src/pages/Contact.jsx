function Contact() {

  const openWhatsApp = () => {
    const phone = "+91 9789497814"; // 🔥 replace with your number
    const message = "Hello, I want to know more about your collection";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-4xl mb-6">Contact Us</h1>

      <button
        onClick={openWhatsApp}
        className="border px-6 py-3 hover:bg-white hover:text-black"
      >
        Chat on WhatsApp
      </button>

    </div>
  );
}

export default Contact;