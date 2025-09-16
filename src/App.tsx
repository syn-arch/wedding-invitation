import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Mail,
  ChevronLeft,
  ChevronRight,
  Gift,
} from "lucide-react";
import { gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import BankCard from "./BankCard";
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [openedEnvelope, setOpenedEnvelope] = useState(false);
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [RSVP, setRSVP] = useState([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const letterRef = useRef(null);
  const t1Ref = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000, // durasi animasi (ms)
      once: true, // animasi hanya jalan sekali
    });
    gsap.registerPlugin(CSSRulePlugin);

    // target pseudo element :before
    const flapRule = CSSRulePlugin.getRule(".envelope:before");

    // Timeline 1: flap & letter
    t1Ref.current = gsap
      .timeline({ paused: true })
      .to(flapRule, {
        duration: 0.5,
        cssRule: { rotateX: 180 },
      })
      .set(flapRule, { cssRule: { zIndex: 10 } })
      .to(letterRef.current, {
        y: -200,
        duration: 0.9,
        ease: "back.inOut(1.5)",
      })
      .set(letterRef.current, { zIndex: 40 })
      .to(letterRef.current, {
        duration: 0.7,
        ease: "back.out(.4)",
        y: -5,
        z: 120,
      });

    return () => {
      t1Ref.current?.kill();
    };
  }, []);

  const openCard = () => {
    t1Ref.current?.play();
    setIsOpenCard(true);

    setTimeout(() => {
      setOpenedEnvelope(true);
      togglePlay();
    }, 15000);
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/assets/song.mp3");
    }

    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const openEnvelope = () => {
    setOpenedEnvelope(true);

    setTimeout(() => {
      togglePlay();
    }, 3000);
  };

  const API_URL = "https://wedding.daisiesoft.com/";

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const nama = formData.get("name") as string;
    const kehadiran = formData.get("attendance") as string;
    const pesan = formData.get("message") as string;

    fetch(API_URL + "insert.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nama, kehadiran, pesan }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        toast.success("Terima kasih atas konfirmasinya!");
        form.reset();

        // Refresh the RSVP list
        fetch(API_URL)
          .then((response) => response.json())
          .then((data) => {
            setRSVP(data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      });
  };

  const pageVariants = {
    enter: (dir: 1 | -1) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(2px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.35, ease: [0.42, 0, 0.58, 1] }, // easeInOut cubic-bezier
    },
    exit: (dir: 1 | -1) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      filter: "blur(2px)",
      transition: { duration: 0.25, ease: [0.42, 0, 1, 1] }, // easeIn cubic-bezier
    }),
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setRSVP(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const chapters = [
    {
      number: "Chapter 1",
      title: "The Wedding Of",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div data-aos="fade-up" data-aos-delay="600">
              <img src="/bismillah.svg" className="mx-auto" alt="Adi & Ai" />
            </div>
            <p
              className="text-slate-600 my-6"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Tanpa mengurangi rasa hormat. Kami mengundang Bapak/Ibu/Saudara/i
              serta Kerabat sekalian untuk menghadiri acara pernikahan kami:
            </p>
            <div data-aos="fade-up" data-aos-delay="600">
              <h3 className="dancing-script text-3xl font-serif text-slate-700 mb-2">
                Adiatna Sukmana
              </h3>
              <div className="w-1/2 h-0.5 bg-gradient-to-r from-pink-300 to-transparent mx-auto"></div>
              <div className="font-serif text-slate-700 my-4">
                <p>Putra Kedua Dari </p>
                <p>Bapak Eman & Ibu Mimin</p>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="900">
              <h3 className="dancing-script text-2xl text-slate-500 mb-2">&</h3>
              <h3 className="dancing-script text-3xl font-serif text-slate-700 mb-2">
                Ai Siti Nurlatipah, S.M
              </h3>
              <div className="w-1/2 h-0.5 bg-gradient-to-r from-pink-300 to-transparent mx-auto"></div>

              <div className="font-serif text-slate-700 my-4">
                <p>Putri Kedua Dari </p>
                <p>Bapak Amin & Ibu Kasmanah</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "Chapter 2",
      title: "Save The Date",
      content: (
        <div className="space-y-6">
          <div className="text-center" data-aos="fade-up" data-aos-delay="600">
            <Calendar className="mx-auto mb-4 text-sage-500" size={48} />
            <div className="bg-white/60 rounded-lg p-6 border border-[#f8bbd0] mb-8">
              <h4 className="text-xl font-serif text-slate-700 mb-4">
                Akad & Resepsi
              </h4>
              <div className="space-y-3 text-slate-600">
                <div className="flex items-center justify-center gap-2">
                  <Calendar size={16} />
                  <span>Minggu, 5 Oktober 2025</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock size={16} />
                  <span>8:00 AM - Selesai</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={16} />
                  <span>Kec.Talegong Kab.Garut</span>
                </div>
                <p className="text-sm mt-2">
                  Kp. Mencos RT 02 RW 04 Desa Mekarmulya Kec.Talegong Kab.Garut
                </p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/oaigmdgBJB4SwPAh7"
              className="mt-5 bg-slate-200 p-3 rounded"
              target="_blank"
            >
              Petunjuk Arah
            </a>
          </div>
        </div>
      ),
    },
    {
      number: "Chapter 3",
      title: "Gift",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Gift
              data-aos="fade-up"
              data-aos-delay="600"
              className="mx-auto mb-4 text-amber-500"
              size={48}
            />
            <main className="flex flex-col items-center justify-center p-2">
              <div data-aos="fade-up" data-aos-delay="600">
                <BankCard
                  name="Adiatna Sukmana"
                  accountNumber="326901019795500"
                />
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <BankCard
                  className="mt-5"
                  name="Ai Siti Nurlatipah"
                  accountNumber="416501016640505"
                />
              </div>
            </main>
          </div>
        </div>
      ),
    },
    {
      number: "Chapter 4",
      title: "RSVP",
      content: (
        <div className="space-y-6">
          <Mail
            data-aos="fade-up"
            data-aos-delay="600"
            className="mx-auto mb-4 text-indigo-400"
            size={48}
          />

          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="bg-white/60 rounded-lg p-6 border border-rose-200 w-full"
          >
            <form onSubmit={handlerSubmit}>
              <div className="mb-4 text-left">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-rose-400"
                  placeholder="Nama Anda"
                  required
                />
              </div>
              <div className="mb-4 text-left">
                <label
                  htmlFor="attendance"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kehadiran
                </label>
                <select
                  id="attendance"
                  name="attendance"
                  className="w-full px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-rose-400"
                  required
                >
                  <option value="">Pilih Kehadiran</option>
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                  <option value="Belum Tentu">Belum Tentu</option>
                </select>
              </div>
              <div className="mb-4 text-left">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pesan
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-rose-400"
                  placeholder="Tulis pesan untuk kami..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition"
              >
                Kirim
              </button>
            </form>
          </div>

          <div className="mt-3" data-aos="fade-up" data-aos-delay="600">
            <h3>Daftar Ucapan</h3>
            <div className="mt-4 space-y-4 max-h-64 overflow-y-auto">
              {RSVP.map((guest, index) => (
                <div
                  key={index}
                  className="bg-white/70 rounded-lg p-4 border border-rose-200"
                >
                  <h4 className="text-lg font-semibold text-rose-600">
                    {guest.nama}
                  </h4>
                  <p className="text-sm text-gray-700">
                    Kehadiran: {guest.kehadiran}
                  </p>
                  {guest.pesan && (
                    <p className="mt-2 text-gray-600 italic">"{guest.pesan}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.35 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  return (
    <>
      <Toaster />
      <AnimatePresence mode="wait">
        {!openedEnvelope && (
          <motion.div
            key="closed" // penting: beda key = beda “halaman”
            variants={fade}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="container-r relative">
              <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
              <div className="flex flex-col">
                <div
                  className={`content-r z-20 ${
                    isOpenCard ? "" : "animate-bounce"
                  }`}
                >
                  <div className="envelope" onClick={openCard} />
                  <div
                    className="letter-r border border-pink-600 shadow-2xl"
                    ref={letterRef}
                  >
                    <div className="message text-gray-700">
                      <p className="font-serif text-lg">
                        السلام عليكم ورحمة الله وبركات
                      </p>
                      <p className="mt-3 font-serif">
                        Dengan segala kerendahan hati, izinkan kami berbagi
                        kabar bahagia ini kepada Sahabat dan Keluarga tercinta.
                      </p>
                      <button
                        onClick={openEnvelope}
                        className="animate-pulse mt-3 font-serif z-30 btn-next text-pink-600"
                      >
                        Loading..
                      </button>
                      <div className="animate-pulse w-16 h-0.5 bg-gradient-to-r from-pink-300 to-transparent mx-auto"></div>
                    </div>
                  </div>
                </div>
                {!isOpenCard && (
                  <div className="z-10">
                    <div className="controls">
                      <button className="btn font-serif" onClick={openCard}>
                        Open
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {openedEnvelope && (
          <motion.div
            key="opened"
            variants={fade}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="min-h-screen relative bg-no-repeat bg-cover bg-center bg-[url(/assets/bg.jpg)]">
              <div className="fixed bottom-5 right-5 z-30">
                <button
                  onClick={togglePlay}
                  className="bg-white/70 hover:bg-white/90 text-gray-800 px-3 py-1 rounded-full shadow-md transition"
                >
                  {isPlaying ? "Pause Music" : "Play Music"}
                </button>
              </div>
              <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
              <div className="container mx-auto px-4 py-8 z-20 relative">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-serif text-white mb-2">
                      Adiatna Sukmana
                    </h1>
                    <h1 className="text-5xl font-serif text-white mb-2">&</h1>
                    <h1 className="text-4xl font-serif text-white mb-2">
                      Ai Siti Nurlatipah
                    </h1>
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#f06292] to-transparent mx-auto mt-4"></div>
                  </div>

                  <div className="relative bg-white rounded-lg shadow-2xl p-8 md:p-12">
                    <div className="absolute inset-4 border-2 border-[#f8bbd0] rounded-lg pointer-events-none">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                        <div className="w-3 h-3 bg-[#f06292] rounded-full"></div>
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white px-4">
                        <div className="w-3 h-3 bg-[#f06292] rounded-full"></div>
                      </div>
                      <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-4">
                        <div className="w-3 h-3 bg-[#f06292] rounded-full"></div>
                      </div>
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white py-4">
                        <div className="w-3 h-3 bg-[#f06292] rounded-full"></div>
                      </div>
                    </div>

                    {/* Book Spine */}
                    <div className="absolute hidden md:block left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent transform -translate-x-1/2"></div>

                    {/* Chapter Navigation */}
                    <div className="flex justify-center mb-8">
                      <div className="flex space-x-2 bg-slate-100 rounded-full p-1">
                        {chapters.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentChapter(index)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              currentChapter === index
                                ? "bg-white text-slate-700 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                          >
                            Ch.{index + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative min-h-[500px]">
                      <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                          key={currentChapter} // kunci agar re-render tiap pindah
                          custom={direction}
                          variants={pageVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="grid md:grid-cols-2 gap-12"
                        >
                          {/* Left Page */}
                          <div className="space-y-6">
                            <div
                              className="text-center"
                              data-aos="fade-up"
                              data-aos-delay="300"
                            >
                              <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-2">
                                {chapters[currentChapter].number}
                              </h2>
                              <h3 className="text-3xl font-serif text-slate-700">
                                {chapters[currentChapter].title}
                              </h3>
                              <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mt-4"></div>
                            </div>

                            {currentChapter === 0 && (
                              <img
                                data-aos="fade-up"
                                data-aos-delay="300"
                                src="/assets/border.png"
                                alt=""
                                className="w-3/4 mx-auto"
                              />
                            )}
                            {currentChapter === 1 && (
                              <div
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className="text-center italic text-slate-500 py-8"
                              >
                                <div className="text-2xl mb-2">"</div>
                                <p className="text-sm leading-relaxed max-w-xs mx-auto">
                                  Dan di antara tanda-tanda kekuasaan-Nya lah
                                  Dia menciptakan untukmu istri-istri dari
                                  jenismu sendiri, supaya kamu cenderung dan
                                  merasa tenteram kepadanya, dan dijadikan-Nya
                                  diantaramu rasa kasih dan sayang. Sesungguhnya
                                  pada yang demikian itu benar-benar terdapat
                                  tanda-tanda bagi kaum yang berfikir. - Q.S Ar
                                  Rum : 21 -
                                </p>
                                <div className="text-2xl mt-2">"</div>
                              </div>
                            )}
                            {currentChapter === 2 && (
                              <div
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className="text-center italic text-slate-500 py-8"
                              >
                                <div className="text-2xl mb-2">"</div>
                                <p className="text-sm leading-relaxed max-w-xs mx-auto">
                                  Doa tulus Anda adalah hadiah terindah, namun
                                  bila ingin berbagi kebahagiaan dalam bentuk
                                  lain, kami dengan penuh syukur akan
                                  menerimanya.
                                </p>
                                <div className="text-2xl mt-2">"</div>
                              </div>
                            )}
                            {currentChapter === 3 && (
                              <div
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className="text-center italic text-slate-500 py-8"
                              >
                                <div className="text-2xl mb-2">"</div>
                                <p className="text-sm leading-relaxed max-w-xs mx-auto">
                                  Hari istimewa kami akan lebih sempurna dengan
                                  doa dan kehadiran Anda. Silakan konfirmasi
                                  kehadiran agar momen ini kian berkesan
                                </p>
                                <div className="text-2xl mt-2">"</div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-center">
                            <div className="w-full">
                              {chapters[currentChapter].content}
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Page Navigation */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200">
                      <button
                        onClick={() => {
                          if (currentChapter === 0) return;
                          window.scrollTo({ top: 150, behavior: "smooth" });
                          setDirection(-1); // ⬅️ geser dari kiri
                          setCurrentChapter((c) => Math.max(0, c - 1));
                        }}
                        disabled={currentChapter === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          currentChapter === 0
                            ? "text-slate-300 cursor-not-allowed"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <ChevronLeft size={20} />
                        Previous
                      </button>

                      {/* <div className="text-sm text-slate-400">
                    Page {currentChapter + 1} of {chapters.length}
                  </div> */}

                      <button
                        onClick={() => {
                          if (currentChapter === chapters.length - 1) return;
                          setDirection(1);
                          setCurrentChapter((c) =>
                            Math.min(chapters.length - 1, c + 1)
                          );
                          setTimeout(() => {
                            window.scrollTo({ top: 200, behavior: "smooth" });
                          }, 100);
                        }}
                        disabled={currentChapter === chapters.length - 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          currentChapter === chapters.length - 1
                            ? "text-slate-300 cursor-not-allowed"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Next
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center mt-8 text-white">
                    <p className="text-sm">
                      With love and gratitude <br /> Adiatna Sukmana{" "}
                      <Heart className="inline" /> Ai Siti Nurlatipah
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
