// Method 1: Using an iframe
const PaymentLinkEmbed = () => {
  return (
    <iframe
      src="https://buy.stripe.com/your_payment_link_id"
      className="w-full h-96 border-0"
      allow="payment"
    />
  );
};

// Method 2: Using a redirect button
const PaymentLinkButton = () => {
  return (
    <a
      href="https://buy.stripe.com/your_payment_link_id"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Pay Now
    </a>
  );
};

export { PaymentLinkEmbed, PaymentLinkButton };