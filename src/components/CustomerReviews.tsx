/**
 * GROCARY SHELF — Customer Reviews & Testimonials
 */

import React, { useState } from 'react';
import { Star, CheckCircle, MapPin, MessageSquarePlus } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/products';
import { CustomerReview } from '../types';
import { useStore } from '../context/StoreContext';

export const CustomerReviews: React.FC = () => {
  const { showToast } = useStore();
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    city: '',
    rating: 5,
    title: '',
    comment: '',
    productName: 'Tailored Supima Cotton Oxford Shirt'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) {
      showToast('Please provide your name and review comment.', 'error');
      return;
    }

    const reviewObj: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      city: newReview.city || 'Pakistan',
      rating: newReview.rating,
      date: 'Just now',
      title: newReview.title || 'Great purchase!',
      comment: newReview.comment,
      verified: true,
      productName: newReview.productName
    };

    setReviews([reviewObj, ...reviews]);
    setIsModalOpen(false);
    setNewReview({
      author: '',
      city: '',
      rating: 5,
      title: '',
      comment: '',
      productName: 'Tailored Supima Cotton Oxford Shirt'
    });
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#075C3B] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#075C3B]" />
              <span>Real Customer Feedback</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151515]">
              Loved Across Every Province
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-lg">
              Read authentic feedback from patrons who wear GROCARY SHELF shirts, trousers, and handcrafted Peshawari chappals daily.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="flex items-center text-amber-500 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-800">4.9 / 5.0 Rating from 450+ buyers</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-[#F1F7F1] hover:bg-[#E9F4EE] text-[#075C3B] border border-[#075C3B]/30 rounded text-xs font-bold flex items-center gap-2 transition-all"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-neutral-50 border border-neutral-200/80 hover:border-[#075C3B]/30 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified buyer badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#075C3B]">
                      <CheckCircle className="w-3 h-3 text-[#075C3B]" /> Verified Order
                    </span>
                  )}
                </div>

                {/* Review Title & Comment */}
                <h4 className="font-bold text-neutral-900 text-sm mb-1.5">&ldquo;{rev.title}&rdquo;</h4>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  {rev.comment}
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-500">
                <div>
                  <strong className="text-neutral-900 block font-semibold">{rev.author}</strong>
                  <span className="flex items-center gap-1 text-neutral-500 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-[#075C3B]" /> {rev.city}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-1">
              Share Your Experience
            </h3>
            <p className="text-xs text-neutral-500 mb-5">
              Your honest feedback helps fellow Pakistani fashion shoppers choose the right fit and fabric.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asad Shah"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">City / Province</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rawalpindi, Punjab"
                    value={newReview.city}
                    onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-sm bg-white"
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Exceptional Peshawari leather quality"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Review Details</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the fabric feel, size fit, delivery speed, and Cash on Delivery service..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded text-xs font-semibold hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#075C3B] hover:bg-[#05462D] text-white rounded text-xs font-bold transition-colors"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
