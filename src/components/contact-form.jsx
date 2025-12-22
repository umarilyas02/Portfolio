"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-0 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400 text-lg">
            Have a question or project in mind? I&apos;d love to hear from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-950 border border-indigo-500 rounded-2xl p-8 space-y-6"
        >
          {/* Input Fields (Name, Email, Subject) */}
          {[
            {
              label: "Your Name",
              id: "name",
              type: "text",
              placeholder: "Your Full Name",
            },
            {
              label: "Your Email",
              id: "email",
              type: "email",
              placeholder: "your.email@example.com",
            },
            {
              label: "Subject",
              id: "subject",
              type: "text",
              placeholder: "Project Inquiry",
            },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-sm font-medium text-center"
            >
              Message sent successfully!
            </motion.div>
          )}

          {/* Submit Button - Matching Form Style */}
          <motion.button
            type="submit"
            disabled={loading}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="group relative w-full overflow-hidden rounded-xl bg-gray-900 border border-gray-800 py-4 px-8 font-bold text-white transition-all duration-300 disabled:opacity-50 md:border-indigo-500 max-md:border-indigo-500"
          >
            {/* The Gradient Dot Background (Expands) */}
            <motion.span
              variants={{
                initial: isMobile ? { scale: 1, x: "-50%", y: "-50%" } : { scale: 0, x: "-50%", y: "-50%" },
                hover: { scale: 1, x: "-50%", y: "-50%" },
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute left-1/2 top-1/2 z-0 h-[350%] w-[110%] origin-center rounded-full bg-linear-to-r from-indigo-600 to-indigo-500"
            />

            {/* Button Content */}
            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-white max-md:text-white">
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <motion.div
                    animate={
                      isMobile || isButtonHovered
                        ? { opacity: 1, x: 5 }
                        : { opacity: 0, x: -10 }
                    }
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="flex items-center"
                  >
                    <ArrowUpRight className="h-7 w-7" />
                  </motion.div>
                </>
              )}
            </span>
          </motion.button>
        </form>
      </div>
    </section>
  );
}
