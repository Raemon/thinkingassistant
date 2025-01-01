'use client'

import Layout from "../components/common/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="w-full max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      </div>
      <div className="w-full max-w-[1200px] mx-auto space-y-6">
        <p className="text-gray-600">Last updated: January 1, 2025</p>

        <section>
          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p>This Privacy Policy explains how we collect, use, and protect your personal information when you use our application.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          <p>We collect the following information through Google OAuth:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Email address</li>
            <li>Basic profile information (name and profile picture)</li>
            <li>Google Account ID (for authentication purposes)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
          <p>We use your information solely for:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Authentication and account management</li>
            <li>Providing you access to our services</li>
            <li>Maintaining account security</li>
            <li>Communicating essential service updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Data Storage</h2>
          <p>Your data is stored securely in our PostgreSQL database hosted on Vercel's infrastructure. We implement industry-standard security measures to protect your information.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Google OAuth for authentication</li>
            <li>Vercel for hosting</li>
            <li>PostgreSQL for data storage</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
          <p>We retain your data only for as long as you maintain an account with us. You can request deletion of your account and associated data at any time.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access your personal data</li>
            <li>Request deletion of your data</li>
            <li>Revoke Google OAuth access</li>
            <li>Request an export of your data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How to Contact Us</h2>
          <p>For any questions about this Privacy Policy or your data, contact us at: [Your Contact Email]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        </section>
      </div>
    </Layout>
  )
}