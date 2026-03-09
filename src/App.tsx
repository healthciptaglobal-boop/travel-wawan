/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowLeft, Star, Calendar, Users, Info } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  price: string;
  details: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: "Uluwatu Temple",
    location: "Bali, Indonesia",
    image: "https://res.cloudinary.com/ddhcevbej/image/upload/v1770972283/011_u6eibt.jpg",
    description: "A majestic sea temple perched on a steep cliff 70 meters above the Indian Ocean.",
    rating: 4.8,
    price: "$45",
    details: "Uluwatu Temple (Pura Luhur Uluwatu) is one of six key temples believed to be Bali's spiritual pillars. It's renowned for its magnificent location, perched on top of a steep cliff approximately 70 metres above sea level. This temple also shares the splendid sunset backdrops as that of Tanah Lot Temple, another important sea temple located in the island's western shores."
  },
  {
    id: 2,
    name: "Regulasi Wisata",
    location: "Informasi Penting",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDUwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojODdDRUZBO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxRTkwRkY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgcng9IjUwIiBmaWxsPSJ1cmwoI2dyYWQpIiAvPgogIDxwYXRoIGQ9Ik0xNTAgNTAgTDM1MCA1MCBRMzgwIDUwIDM4MCA4MCBMMzgwIDI1MCBRMzgwIDI4MCAzNTAgMjgwIEwxNTAgMjgwIE0xMjAgMjgwIEwxMjAgMjUwIEwxMjAgODAgUTEyMCA1MCAxNTAgNTAiIGZpbGw9IndoaXRlIiAvPgogIDxjaXJjbGUgY3g9IjI1MCIgY3k9IjE0MCIgcj0iNjAiIGZpbGw9IiM2NkJCNkEiIC8+CiAgPHBhdGggZD0iTTIxMCAxNDAgTDI0MCAxNzAgTDMwMCAxMTAiIHN0cm9rZT0iI0ZGRjE3NiIgc3Ryb2tlLXdpZHRoPSIxNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAvPgogIDx0ZXh0IHg9IjI1MCIgeT0iMzQwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSI1MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5SZWd1bGFzaTwvdGV4dD4KPC9zdmc+",
    description: "Panduan regulasi dan aturan perjalanan penting untuk memastikan kenyamanan Anda.",
    rating: 5.0,
    price: "Gratis",
    details: "Halaman ini berisi informasi mengenai regulasi terbaru, syarat perjalanan, dan aturan lokal yang harus dipatuhi oleh setiap wisatawan. Pastikan Anda membaca semua poin regulasi sebelum memulai perjalanan Anda untuk menghindari kendala di lapangan."
  },
  {
    id: 3,
    name: "Informasi Obat",
    location: "Layanan Kesehatan",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDUwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojODdDRUZBO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxRTkwRkY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgcng9IjUwIiBmaWxsPSJ1cmwoI2dyYWQpIiAvPgogIDxyZWN0IHg9IjE4MCIgeT0iMTAwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE4MCIgcng9IjIwIiBmaWxsPSIjQUREOEU2IiAvPgogIDxyZWN0IHg9IjIwMCIgeT0iODAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSIjQUREOEU2IiAvPgogIDxjaXJjbGUgY3g9IjI1MCIgY3k9IjE5MCIgcj0iNDAiIGZpbGw9IndoaXRlIiAvPgogIDxwYXRoIGQ9Ik0yMzAgMTkwIEgyNzAgTTI1MCAxNzAgVjIxMCIgc3Ryb2tlPSIjNENBRjUwIiBzdHJva2Utd2lkdGg9IjE1IiAvPgogIDxlbGxpcHNlIGN4PSIyMDAiIGN5PSI2MCIgcng9IjIwIiByeT0iMTAiIGZpbGw9IndoaXRlIiAvPgogIDxlbGxpcHNlIGN4PSIzMDAiIGN5PSI3MCIgcng9IjIwIiByeT0iMTAiIGZpbGw9IiNBREQ4RTYiIC8+CiAgPHJlY3QgeD0iMjgwIiB5PSIyNTAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSIxMCIgZmlsbD0iIzRDQUY1MCIgLz4KICA8dGV4dCB4PSIyNTAiIHk9IjM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+SW5mb3JtYXNpIE9iYXQ8L3RleHQ+Cjwvc3ZnPg==",
    description: "Informasi lengkap mengenai penggunaan dan dosis obat-obatan untuk kesehatan Anda.",
    rating: 4.7,
    price: "Gratis",
    details: "Layanan ini memberikan informasi mendalam mengenai berbagai jenis obat, cara penggunaan yang benar, serta efek samping yang mungkin timbul. Sangat penting bagi wisatawan untuk memahami informasi medis dasar selama perjalanan."
  },
  {
    id: 4,
    name: "Eiffel Tower",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
    description: "The global cultural icon of France and one of the most recognizable structures in the world.",
    rating: 4.6,
    price: "$55",
    details: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Locally nicknamed 'La dame de fer' (French for 'Iron Lady'), it was constructed from 1887 to 1889 as the centerpiece of the 1889 World's Fair."
  },
  {
    id: 5,
    name: "Machu Picchu",
    location: "Cusco, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
    description: "A 15th-century Inca citadel located in the Eastern Cordillera of southern Peru.",
    rating: 5.0,
    price: "$150",
    details: "Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-meter (7,970 ft) mountain ridge. It is located in the Machupicchu District within Urubamba Province above the Sacred Valley, which is 80 kilometers (50 mi) northwest of Cusco."
  },
  {
    id: 6,
    name: "Zermatt",
    location: "Valais, Switzerland",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    description: "A mountain resort renowned for skiing, climbing and hiking, below the iconic Matterhorn.",
    rating: 4.9,
    price: "$200",
    details: "Zermatt, in southern Switzerland’s Valais canton, is a mountain resort renowned for skiing, climbing and hiking. The town, at an elevation of around 1,600m, lies below the iconic, pyramid-shaped Matterhorn peak. Its main street, Bahnhofstrasse is lined with boutique shops, hotels and restaurants, and also has a lively après-ski scene."
  }
];

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedDestination = DESTINATIONS.find(d => d.id === selectedId);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold italic">W</div>
            <h1 className="text-xl font-semibold tracking-tight">Wanderlust</h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-black/60">
            <a href="#" className="hover:text-emerald-600 transition-colors">Destinations</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Experiences</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">About</a>
          </nav>
          <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black/80 transition-all">
            Plan a Trip
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Discover your next adventure</h2>
                <p className="text-black/50 max-w-2xl">Explore our handpicked selection of the world's most breathtaking destinations, from serene temples to majestic mountain peaks.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {DESTINATIONS.map((dest) => (
                  <motion.div
                    key={dest.id}
                    layoutId={`card-${dest.id}`}
                    onClick={() => setSelectedId(dest.id)}
                    className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <motion.img
                        layoutId={`image-${dest.id}`}
                        src={dest.image}
                        alt={dest.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold">{dest.rating}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1 text-emerald-600 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">{dest.location}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors">{dest.name}</h3>
                      <p className="text-sm text-black/50 line-clamp-2">{dest.description}</p>
                      <div className="mt-6 pt-6 border-top border-black/5 flex justify-between items-center">
                        <span className="text-lg font-semibold">{dest.price}<span className="text-xs text-black/40 font-normal"> / person</span></span>
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-emerald-600 transition-colors">
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="mb-8 flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-black transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                Back to destinations
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div layoutId={`card-${selectedDestination?.id}`} className="relative rounded-[40px] overflow-hidden shadow-2xl">
                  <motion.img
                    layoutId={`image-${selectedDestination?.id}`}
                    src={selectedDestination?.image}
                    alt={selectedDestination?.name}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </motion.div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-emerald-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-[0.2em] font-bold">{selectedDestination?.location}</span>
                  </div>
                  <h2 className="text-5xl font-serif italic mb-6 leading-tight">{selectedDestination?.name}</h2>
                  
                  <div className="flex gap-8 mb-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-1">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{selectedDestination?.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-1">Duration</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold">3-5 Days</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-1">Group Size</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold">Max 12</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 text-black/70 leading-relaxed mb-10">
                    <p className="text-lg font-medium text-black">{selectedDestination?.description}</p>
                    <p>{selectedDestination?.details}</p>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-xl shadow-black/5">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <span className="text-sm text-black/40 block mb-1">Starting from</span>
                        <span className="text-3xl font-bold">{selectedDestination?.price}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-black/40 block mb-1">Availability</span>
                        <span className="text-sm font-semibold text-emerald-600">Limited Spots</span>
                      </div>
                    </div>
                    <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                      Book This Experience
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-stone-100 rounded-3xl">
                  <Info className="w-6 h-6 text-emerald-600 mb-4" />
                  <h4 className="font-semibold mb-2">What's Included</h4>
                  <ul className="text-sm text-black/60 space-y-2">
                    <li>• Luxury Accommodation</li>
                    <li>• Professional Local Guide</li>
                    <li>• Daily Breakfast & Dinner</li>
                    <li>• All Entry Fees</li>
                  </ul>
                </div>
                <div className="p-8 bg-stone-100 rounded-3xl">
                  <Calendar className="w-6 h-6 text-emerald-600 mb-4" />
                  <h4 className="font-semibold mb-2">Best Time to Visit</h4>
                  <p className="text-sm text-black/60">The ideal season for this destination is between April and October when the weather is most favorable.</p>
                </div>
                <div className="p-8 bg-stone-100 rounded-3xl">
                  <Users className="w-6 h-6 text-emerald-600 mb-4" />
                  <h4 className="font-semibold mb-2">Guest Reviews</h4>
                  <p className="text-sm text-black/60">"An absolutely life-changing experience. The attention to detail and local knowledge was exceptional."</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold italic">W</div>
              <h1 className="text-xl font-semibold tracking-tight">Wanderlust</h1>
            </div>
            <p className="text-stone-400 max-w-sm mb-8">Crafting unforgettable journeys for the modern explorer. Join us in discovering the world's most hidden gems.</p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'Facebook'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm opacity-50" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Explore</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">All Destinations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Travel Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Group Tours</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Private Trips</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-stone-500 text-xs flex flex-col md:flex-row justify-between gap-4">
          <p>© 2024 Wanderlust Travel Co. All rights reserved.</p>
          <p>Designed with passion for explorers everywhere.</p>
        </div>
      </footer>
    </div>
  );
}
