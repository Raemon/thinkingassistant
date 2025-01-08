'use client'

import Layout from "../components/common/Layout";

export default function TermsOfService() {
  return (
    <Layout>
      <div className="w-full max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      </div>
      <div className="w-full max-w-[1200px] mx-auto space-y-6">
        <p className="text-gray-600">Last updated: January 1, 2025</p>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using this application, you agree to be bound by these Terms of Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
          <p>Our application includes:</p>
          <ul>
            <li>A writing tool with AI assistance.</li>
            <li>A platform for knowledge workers to hire cognitive assistants, who help them stay focused and think through difficult problems.</li>
            <li>We use Google OAuth as one of our authentication methods.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Account Registration</h2>
          <p>To use our service, you must:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Be at least 13 years of age</li>
            <li>Register using your Google account</li>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Keep your login credentials secure</li>
            <li>Use the service in compliance with all applicable laws</li>
            <li>Not attempt to breach or test our security measures</li>
            <li>Not use the service for any illegal or unauthorized purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Privacy and Data Protection</h2>
          <p>Your use of the service is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Service Modifications</h2>
          <p>We reserve the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Modify or discontinue any part of the service</li>
            <li>Update these terms at any time</li>
            <li>Terminate accounts that violate these terms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
          <p>The service is provided "as is" without warranties of any kind, either express or implied.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
          <p>For any questions about these Terms, please contact us at: [Your Contact Email]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].</p>
        </section>
      </div>
    </Layout>
  )
}