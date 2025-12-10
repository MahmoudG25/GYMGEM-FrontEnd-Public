import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, ArrowRight, Download } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { getOrderById } from "./Checkout";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get order from localStorage
    const orderData = getOrderById(orderId);
    
    if (!orderData) {
      // If no order found, redirect to courses
      navigate('/courses');
      return;
    }
    
    setOrder(orderData);
  }, [orderId, navigate]);

  if (!order) {
    return null;
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 bebas-regular mb-3">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600 poppins-regular">
              Thank you for your purchase. You're all set!
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 bebas-regular mb-2">
                Order Confirmation
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 poppins-regular">
                <div>
                  <span className="font-medium text-gray-900">Order ID:</span>{" "}
                  <span className="font-mono">{order.orderId}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 poppins-medium mb-4">
                Course Purchased
              </h3>
              <div className="flex gap-4">
                <img
                  src={order.course.img || "https://via.placeholder.com/200x112"}
                  alt={order.course.title}
                  className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 poppins-medium mb-1">
                    {order.course.title}
                  </h4>
                  <p className="text-sm text-gray-600 poppins-regular line-clamp-2">
                    {order.course.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-[#FF8211]/10 text-[#FF8211] rounded text-xs font-medium poppins-regular">
                      {order.course.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium poppins-regular">
                      {order.course.level}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-700 poppins-regular mb-2">
                <span>Payment Method</span>
                <span className="capitalize">{order.paymentMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 poppins-semibold">
                <span>Total Paid</span>
                <span className="text-[#86ac55]">${parseFloat(order.amount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-gradient-to-r from-[#FF8211]/10 to-[#86ac55]/10 rounded-xl border border-[#FF8211]/20 p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 bebas-regular mb-3">
              What's Next?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 poppins-regular">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#86ac55] flex-shrink-0 mt-0.5" />
                <span>You now have full access to all course materials</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#86ac55] flex-shrink-0 mt-0.5" />
                <span>Start learning at your own pace, anytime, anywhere</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#86ac55] flex-shrink-0 mt-0.5" />
                <span>Track your progress and earn your certificate upon completion</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#86ac55] flex-shrink-0 mt-0.5" />
                <span>A confirmation email has been sent to your registered email</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/trainee/courses"
              className="px-6 py-4 bg-[#FF8211] text-white rounded-lg font-semibold bebas-regular text-lg hover:bg-[#ff7906] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Go to My Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/courses"
              className="px-6 py-4 border-2 border-[#FF8211] text-[#FF8211] rounded-lg font-semibold bebas-regular text-lg hover:bg-[#FF8211]/10 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse More Courses
            </Link>
          </div>

          {/* Support Message */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 poppins-regular">
              Need help getting started?{" "}
              <Link to="/support" className="text-[#FF8211] font-medium hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderSuccess;
