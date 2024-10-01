import { motion } from "framer-motion";
import { FaUserFriends, FaComments, FaHeart, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const MainContent = () => {
  return (
    <main className="pt-20">
      <section className="bg-gradient-to-br from-deepSkyBlue-500 via-deepSkyBlue-400 to-deepSkyBlue-300 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Connect, Share, and Engage
              </h2>
              <p className="text-lg md:text-xl mb-8">
                Join our vibrant community and express yourself like never
                before!
              </p>
              <Link to={"/register"}>
                <motion.button
                  className="bg-blue-900 text-white text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-skyBlue-600 transition duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={600}
                height={400}
                alt="App Preview"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose YouGram?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              Icon={FaUserFriends}
              title="Connect"
              description="Build meaningful relationships with like-minded individuals"
            />
            <FeatureCard
              Icon={FaComments}
              title="Engage"
              description="Participate in vibrant discussions on topics you care about"
            />
            <FeatureCard
              Icon={FaHeart}
              title="Like"
              description="Show appreciation for content that resonates with you"
            />
            <FeatureCard
              Icon={FaShareAlt}
              title="Share"
              description="Spread ideas and content that matter to you"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-deepSkyBlue-100">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard
              number={1}
              title="Create Your Profile"
              description="Sign up and customize your unique profile"
            />
            <StepCard
              number={2}
              title="Connect with Others"
              description="Find and follow people with similar interests"
            />
            <StepCard
              number={3}
              title="Share Your Story"
              description="Post updates, photos, and thoughts with your network"
            />
            <StepCard
              number={4}
              title="Engage and Grow"
              description="Like, comment, and share to build your community"
            />
          </div>
        </div>
      </section>
      {/* 
      <section id="testimonials" className="py-20 bg-deepSkyBlue text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="ConnectHub has transformed the way I network professionally. It's intuitive and powerful!"
              author="Jane Doe"
              title="Marketing Executive"
            />
            <TestimonialCard
              quote="I've made more meaningful connections here in a month than I have in years on other platforms."
              author="John Smith"
              title="Freelance Designer"
            />
            <TestimonialCard
              quote="The engagement on ConnectHub is unparalleled. My content reaches the right audience every time."
              author="Emily Johnson"
              title="Content Creator"
            />
          </div>
        </div>
      </section> */}

      <section className="py-20 bg-deepSkyBlue-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Ready to Get Started?
          </h3>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Join thousands of others and start connecting today!
          </p>
          <Link to={"/register"}>
            <motion.button
              className="bg-blue-700 text-white text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-skyBlue-600 transition duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up Now
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
};

const FeatureCard = ({ Icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg text-center"
    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
  >
    <Icon className="text-deepSkyBlue text-4xl mx-auto mb-4" />
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

function StepCard({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-skyBlue text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-4">
        {number}
      </div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, title }) {
  return (
    <motion.div
      className="bg-white text-gray-800 p-6 rounded-lg shadow-lg"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
    >
      <p className="mb-4 italic">"{quote}"</p>
      <p className="font-semibold">{author}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </motion.div>
  );
}

export default MainContent;
