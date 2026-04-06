import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { motion, useScroll, useTransform } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 100]);
  const storyVariant = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};
  return (
    <PageWrapper>
      <div className="w-full">

        {/* HERO */}
        <div className="relative h-screen overflow-hidden">

          <motion.img
            style={{ y }} // ✅ PARALLAX ADDED
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600"
            alt="Hero"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-7xl font-bold mb-6 tracking-wide"
            >
              ANKAA
            </motion.h1>

            <p className="text-gray-300 mb-8 max-w-xl">
              Premium clothing designed for modern lifestyle.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="px-8 py-3 border border-white"
            >
              Explore Collection
            </motion.button>

          </div>
        </div>

        {/* 🔥 SCROLL STORYTELLING ADDED */}
        <motion.div
  variants={storyVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="py-20 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white text-center"
>
  <motion.h2
    className="text-4xl md:text-5xl font-bold max-w-2xl"
    whileInView={{ scale: [0.95, 1] }}
    transition={{ duration: 0.6 }}
  >
    Crafted for Expression
  </motion.h2>
</motion.div>

        <motion.div
  variants={storyVariant}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="py-20 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white text-center"
>
  <motion.h2
    className="text-4xl md:text-5xl font-bold max-w-2xl"
    whileInView={{ scale: [0.95, 1] }}
    transition={{ duration: 0.6 }}
  >
    Minimal. Modern. Premium.
  </motion.h2>
</motion.div>

        {/* CATEGORY */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-black text-white py-20 px-8 grid md:grid-cols-2 gap-6"
        >

          <div
            onClick={() => navigate("/products?category=men")}
            className="relative h-80 overflow-hidden group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1200"
              alt="Men"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold tracking-wide group-hover:scale-110 transition duration-300">
                Men
              </h2>
            </div>
          </div>

          <div
            onClick={() => navigate("/products?category=women")}
            className="relative h-80 overflow-hidden group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200"
              alt="Women"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold tracking-wide group-hover:scale-110 transition duration-300">
                Women
              </h2>
            </div>
          </div>

        </motion.div>

        {/* PRODUCTS */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-black text-white py-20 px-8"
        >
          
          <h2 className="text-3xl font-bold mb-10 text-center">
            Featured Products
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="group">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
                alt="T-Shirt"
              />
              <h3 className="mt-3">T-Shirt</h3>
              <p className="text-gray-400">₹799</p>
            </div>

            <div className="group">
              <img
                src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800"
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
                alt="Hoodie"
              />
              <h3 className="mt-3">Hoodie</h3>
              <p className="text-gray-400">₹1499</p>
            </div>

            <div className="group">
              <img
                src="https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800"
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
                alt="Jacket"
              />
              <h3 className="mt-3">Jacket</h3>
              <p className="text-gray-400">₹1999</p>
            </div>

          </div>

        </motion.div>

      </div>
    </PageWrapper>
  );
}

export default Home;