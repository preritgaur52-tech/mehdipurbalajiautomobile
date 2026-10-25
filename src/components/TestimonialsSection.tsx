import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle, Plus, Send, X } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  quote: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'R. K. Sharma',
    location: 'Fleet Owner · Agra-Delhi Transport',
    service: 'High Speed Diesel & Bulk DEF Urea',
    rating: 5,
    date: 'October 2026',
    quote:
      'We run 12 multi-axle trucks through the Mathura-Hathras highway corridor weekly. Mehdipur Balaji Automobile is our fixed refueling and DEF hub. Exact automated billing and zero adulteration have kept our engine injector repair costs practically zero.',
  },
  {
    id: '2',
    name: 'Vikram P.',
    location: 'Commuter · Noida to Vrindavan',
    service: 'Power Petrol & Washroom Facilities',
    rating: 5,
    date: 'October 2026',
    quote:
      'The washrooms are exceptionally clean, sanitized, and well-maintained—far better than typical highway petrol pumps. Attendants filled digital air without any delay, and the car felt noticeably smoother with HP Power fuel.',
  },
  {
    id: '3',
    name: 'Amitabh G.',
    location: 'Local Farmer · Raya Sub-District',
    service: 'Diesel & HP Lubricants',
    rating: 5,
    date: 'September 2026',
    quote:
      'Always get 100% exact quantity fuel here. The station staff is courteous and the 5-litre standard calibration flask is readily shown on request. It is the most trustworthy HP pump in our region.',
  },
  {
    id: '4',
    name: 'S. Chaudhry',
    location: 'Tour Bus Operator · Mathura Pilgrimage Tour',
    service: 'Diesel, Windshield Cleaning & Rest Stop',
    rating: 5,
    date: 'September 2026',
    quote:
      'Spacious forecourt allows smooth turning and parking for 50-seater tourist luxury coaches. Safe, well-lit at night, pure cold drinking water, and quick windshield cleaning for our passengers.',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [authorService, setAuthorService] = useState('Premium Fueling');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !feedback.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      name: authorName.trim(),
      location: 'Highway Traveler',
      service: authorService,
      rating,
      date: 'Just now',
      quote: feedback.trim(),
    };

    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setAuthorName('');
      setFeedback('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-slate-100/60 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Real Customer Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Customer Testimonials & Reviews
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              Hear from travelers, fleet drivers, and local residents who rely on Mehdipur Balaji Automobile 
              every day for pure fuel, clean amenities, and dependable highway hospitality.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition-all whitespace-nowrap self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Your Review</span>
          </button>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-500 ml-1.5">{rev.rating}.0</span>
                </div>

                {/* Service Badge (Unboxed text with bullet) */}
                <div className="text-xs font-semibold text-blue-700 mb-3 bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                  {rev.service}
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-[11px] text-slate-500">{rev.location}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* HP Satisfaction Strip */}
        <div className="mt-10 bg-white rounded-xl p-4 border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Over 10,000+ happy highway travelers, tourists, and commercial fleets fueled safely.</span>
          </div>
          <span className="font-semibold text-slate-800">100% Genuine HPCL Products Only</span>
        </div>
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Thank You for Your Review!</h3>
                <p className="text-xs text-slate-600">
                  Your feedback helps us continuously elevate our service and facilities at Mehdipur Balaji Automobile.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Share Your Experience</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    How was your pitstop at Mehdipur Balaji Automobile HP Fuel Hub?
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name or Initials
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Rahul S. or Sharma Transports"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Service Utilized
                  </label>
                  <select
                    value={authorService}
                    onChange={(e) => setAuthorService(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Premium Fueling">Premium & High-Speed Fueling</option>
                    <option value="Best Washroom Facilities">Best Washroom Facilities</option>
                    <option value="Tire Inflation & Check">Tire Inflation & Check</option>
                    <option value="Best Quality Urea">Best Quality DEF Urea (AUS 32)</option>
                    <option value="Express Car Wash">Express Vehicle & Windshield Wash</option>
                    <option value="Convenience Store">Highway Convenience Store</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">{rating} out of 5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Feedback
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about the fuel quality, staff service, washrooms, or turnaround..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
