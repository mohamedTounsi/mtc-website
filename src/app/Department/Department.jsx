"use client";

import { motion } from "framer-motion";
import { Camera, Users, Code, ArrowRight, Handshake } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Department() {
  const router = useRouter();

  const departments = [
    {
      icon: <Camera />,
      title: "Media Department",
      desc: "The Media Department brings our ideas to life through creativity and design. From graphic content and video editing to social media management, this team ensures every event and initiative is shared with impact and professionalism.",
      gradient: "from-purple-600 to-purple-400",
      slug: "mediaDepartment",
    },
    {
      icon: <Handshake />,
      title: "Sponsoring Department",
      desc: "The Sponsoring Department builds strong partnerships and secures vital support for our initiatives. By connecting with sponsors and fostering collaborations, this team ensures our projects have the resources needed to thrive.",
      gradient: "from-purple-700 to-purple-500",
      slug: "sponsoringDepartment",
    },
    {
      icon: <Users />,
      title: "HR Department",
      desc: "The HR Department focuses on people — the heart of our club. They manage recruitment, nurture members’ skills, and ensure strong collaboration across teams, creating a supportive and motivating environment for everyone.",
      gradient: "from-purple-500 to-purple-300",
      slug: "hrDepartment",
    },
    {
      icon: <Code />,
      title: "Dev Department",
      desc: "The Dev Department drives innovation by building and maintaining the club’s technical projects. From developing websites and apps to experimenting with the latest technologies, this team transforms ideas into functional, impactful solutions.",
      gradient: "from-purple-800 to-purple-600",
      slug: "devDepartment",
    },
  ];

  return (
    <section
      id="departments"
      className="w-[92%] md:w-full mx-auto px-4 sm:px-6 lg:px-6 text-white py-12 lg:py-20"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center lg:text-left mb-16"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
          OUR DEPARTMENTS
        </h1>
        <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full mx-auto lg:mx-0"></div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-4xl mt-8 mx-auto lg:mx-0"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
          voluptate laborum culpa fuga vel sapiente nemo fugiat temporibus
          reiciendis, aut non debitis cum vero quasi, animi repudiandae
          voluptates reprehenderit incidunt.
        </motion.p>
      </motion.div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.title}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group relative cursor-pointer"
            onClick={() => router.push(`/${dept.slug}`)}
          >
            <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-900/0 to-purple-800/0 group-hover:from-purple-900/10 group-hover:to-purple-800/5 transition-all duration-500"></div>

              <div className="relative z-10">
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${dept.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <div className="w-8 h-8 text-white flex items-center justify-center">
                    {dept.icon}
                  </div>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-purple-100 transition-colors duration-300">
                  {dept.title}
                </h3>

                <p className="text-gray-400 text-sm lg:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-6">
                  {dept.desc}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-purple-400 text-sm font-medium group-hover:translate-x-1 transition-all duration-300">
                    See Department
                  </span>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-all duration-300">
                    <ArrowRight className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-all duration-300" />
                  </div>
                </div>

                <div className="mt-6 h-px bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 group-hover:via-purple-400/80 transition-all duration-500"></div>
              </div>

              <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/20 rounded-full group-hover:bg-purple-400/50 group-hover:scale-150 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 border-l border-b border-purple-500/20 group-hover:border-purple-400/50 transition-colors duration-300"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      />
    </section>
  );
}
