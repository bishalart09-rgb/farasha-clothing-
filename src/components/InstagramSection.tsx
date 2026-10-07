import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/products';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-[#F8F5F0] border-t border-[#EDE6DC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Raise Up */}
        <RaiseUp yOffset={28} className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.25em] uppercase text-[#9E7D4E] font-medium mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>@farashaclothing</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-wide mb-3">
            FOLLOW THE FARASHA WOMAN
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-[#736B60] font-light">
            Behind the seams at our Dubai atelier, client celebrations across the Gulf, and glimpses of upcoming capsule releases.
          </p>
        </RaiseUp>

        {/* 6-image Editorial Fashion Grid with Staggered Raise Up */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden bg-[#E5DFD4] block shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay with Instagram icon and caption */}
              <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                <div className="flex justify-end">
                  <ArrowUpRight className="w-4 h-4 text-[#DFC7A5]" />
                </div>
                <div>
                  <p className="text-[10px] leading-snug line-clamp-3 text-neutral-200 font-light mb-1">
                    {post.caption}
                  </p>
                  <span className="text-[9px] tracking-widest uppercase text-[#C5A880] font-medium">
                    {post.handle}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow Button with Raise Up */}
        <RaiseUp delay={0.2} yOffset={20} className="mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium text-[#171717] hover:text-[#9E7D4E] transition-colors group"
          >
            <Instagram className="w-4 h-4 text-[#9E7D4E]" />
            <span>JOIN US ON INSTAGRAM</span>
            <span className="text-neutral-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </RaiseUp>
      </div>
    </section>
  );
};
