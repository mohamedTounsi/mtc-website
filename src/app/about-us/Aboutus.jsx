"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Check,
  ArrowRight,
  Sparkles,
  Calendar,
  Users,
  Trophy,
  MapPin,
} from "lucide-react";

export function History() {
  const stats = [
    {
      number: "12+",
      label: "YEARS EXPERIENCE",
    },
    {
      number: "3000+",
      label: "REACHED MEMBERS",
    },
    {
      number: "20+",
      label: "SESSIONS IN 1 YEAR",
    },
    {
      number: "4+",
      label: "NATIONAL EVENTS",
    },
  ];

  return (
    <section className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-white py-12 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="relative inline-block">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
            OVER A DECADE OF DELIGHT
          </h2>
          <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-purple-500/50"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-purple-500/50"></div>
        </div>
        <p className="text-gray-400 mt-8 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          For more than ten years, Microsoft Tech Club ISIMS has been empowering
          students to explore technology, develop their skills, and turn ideas
          into real impact. Through innovative events, hands-on training, and a
          supportive community, we continue to inspire the next generation of
          tech leaders.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-px h-full bg-purple-500"></div>
          <div className="absolute top-0 left-2/4 w-px h-full bg-purple-500"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-purple-500"></div>
        </div>

        <div className="relative grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-purple-500/20"></div>
              )}

              <div className="p-8 lg:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/0 via-purple-800/0 to-purple-700/0 group-hover:from-purple-900/10 group-hover:via-purple-800/5 group-hover:to-purple-700/10 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl font-bold text-purple-500/20 blur-sm group-hover:text-purple-500/30 transition-colors duration-300">
                      {stat.number}
                    </div>
                  </div>

                  <div className="text-gray-400 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 group-hover:text-purple-300 transition-colors duration-300">
                    {stat.label}
                  </div>

                  <div className="relative h-px bg-gray-800 mx-auto w-16 group-hover:w-24 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 w-3 h-3 border-l border-t border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 border-r border-b border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      ></motion.div>
    </section>
  );
}

export function Benefits() {
  return (
    <section className="w-[94%] max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-white py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px] h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 rounded-2xl p-[2px] group-hover:p-[3px] transition-all duration-300">
            <div className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
              <Image
                src="/heartpic.webp"
                alt="Benefits"
                width={600}
                height={500}
                priority
              />
            </div>
          </div>

          <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full backdrop-blur-sm border border-purple-400/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-400/20"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 max-w-2xl"
        >
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              BENEFITS
            </h2>
            <div className="absolute -top-2 -left-2 w-16 h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"></div>
          </div>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">
            Joining Microsoft Tech Club ISIMS means unlocking opportunities to
            grow, learn, and connect in ways that go beyond the classroom.
          </p>

          <ul className="space-y-4 mb-10">
            {[
              " Learn & Get Certified Access free workshops, training, and Microsoft certification vouchers to boost your skills and career profile. ",
              "Build & Innovate Participate in hackathons, bootcamps, and real-world projects where you can apply your knowledge and create impactful solutions.",
              "Connect & Grow Join a vibrant community of students, experts, and industry leaders who share your passion for technology and innovation.",
            ].map((benefit, index) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 group"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Check className="w-6 h-3 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  {benefit}
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative group bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 text-white py-4 px-8 rounded-full font-medium text-sm sm:text-base transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            <span className="relative z-10 flex items-center gap-2">
              CONTACT US
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export function AboutUs() {
  return (
    <section className="w-[94%]  md:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-white py-12 lg:py-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1 max-w-2xl order-2 lg:order-1"
        >
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              WHY CHOOSE US?
            </h2>
            <div className="absolute -top-2 -left-2 w-20 h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"></div>
          </div>

          <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
            At Microsoft Tech Club ISIMS, we are more than just a student club –
            we are a community of innovators, learners, and future leaders in
            technology.
          </p>

          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 mb-8">
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              We provide hands-on training, workshops, and access to real-world
              tools to help you grow your technical and professional skills. Our
              members benefit from exclusive opportunities like Microsoft
              certifications, hackathons, and mentorship from industry experts.
              Above all, we believe in collaboration, creativity, and
              empowerment – helping every student turn their passion for tech
              into impact.
            </p>
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-600 to-purple-400 rounded-l-2xl"></div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative group bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 text-white py-4 px-8 rounded-full font-medium text-sm sm:text-base transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            <span className="relative z-10 flex items-center gap-2">
              CONTACT US
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px] h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group order-1 lg:order-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-2xl p-[2px] group-hover:p-[3px] transition-all duration-300">
            <div className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
              <Image
                src="/all2.jpeg"
                alt="About image"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500/20 rounded-full backdrop-blur-sm border border-purple-400/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-purple-500/10 rounded-full backdrop-blur-sm border border-purple-400/20"></div>
        </motion.div>
      </div>
    </section>
  );
}

{
  /* Right image box - Made much bigger and more responsive */
}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
  className="relative w-full sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px] h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] group order-1 lg:order-2"
>
  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-2xl p-[2px] group-hover:p-[3px] transition-all duration-300">
    <div className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden">
      <Image
        src="/grouppic.webp"
        alt="About image"
        width={1000}
        height={1000}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        priority
      />
    </div>
  </div>

  <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500/20 rounded-full backdrop-blur-sm border border-purple-400/30 flex items-center justify-center">
    <Sparkles className="w-4 h-4 text-purple-400" />
  </div>
  <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-purple-500/10 rounded-full backdrop-blur-sm border border-purple-400/20"></div>
</motion.div>;
