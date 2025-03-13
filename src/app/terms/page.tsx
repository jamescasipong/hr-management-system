"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, FileText, ExternalLink } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">HR</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Connect</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/documentation">
              <Button variant="ghost" size="sm">Documentation</Button>
            </Link>
            <Link href="/contact-us">
              <Button variant="ghost" size="sm">Contact Us</Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Last updated: March 15, 2024
          </p>
        </div>
        
        <div className="prose prose-blue max-w-none dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300">
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the HRConnect platform operated by HRConnect, Inc. ("us", "we", "our").
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Subscriptions</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or HRConnect, Inc. cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting HRConnect, Inc. customer support team.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            A valid payment method, including credit card or PayPal, is required to process the payment for your Subscription. You shall provide HRConnect, Inc. with accurate and complete billing information including full name, address, state, zip code, telephone number, and valid payment method information. By submitting such payment information, you automatically authorize HRConnect, Inc. to charge all Subscription fees incurred through your account to any such payment instruments.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            Should automatic billing fail to occur for any reason, HRConnect, Inc. will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Free Trial</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            HRConnect, Inc. may, at its sole discretion, offer a Subscription with a free trial for a limited period of time ("Free Trial").
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            You may be required to enter your billing information in order to sign up for the Free Trial.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            If you do enter your billing information when signing up for the Free Trial, you will not be charged by HRConnect, Inc. until the Free Trial has expired. On the last day of the Free Trial period, unless you cancelled your Subscription, you will be automatically charged the applicable subscription fee for the type of Subscription you have selected.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            At any time and without notice, HRConnect, Inc. reserves the right to (i) modify the terms and conditions of the Free Trial offer, or (ii) cancel such Free Trial offer.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Fee Changes</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            HRConnect, Inc., in its sole discretion and at any time, may modify the Subscription fees for the Subscriptions. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            HRConnect, Inc. will provide you with a reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            Your continued use of the Service after the Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Refunds</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Certain refund requests for Subscriptions may be considered by HRConnect, Inc. on a case-by-case basis and granted at the sole discretion of HRConnect, Inc.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Content</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through the Service. However, by posting Content using the Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            HRConnect, Inc. has the right but not the obligation to monitor and edit all Content provided by users.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            In addition, Content found on or through this Service are the property of HRConnect, Inc. or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Prohibited Uses</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
          </p>
          
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate HRConnect, Inc., a HRConnect, Inc. employee, another user, or any other person or entity.</li>
            <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm or offend HRConnect, Inc. or users of the Service or expose them to liability.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Analytics</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            We may use third-party Service Providers to monitor and analyze the use of our Service.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. No Use By Minors</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            The Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using the Service, you warrant and represent that you are at least eighteen (18) years of age and with the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of these Terms. If you are not at least eighteen (18) years old, you are prohibited from both the access and usage of the Service.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">9. Accounts</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">10. Intellectual Property</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of HRConnect, Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of HRConnect, Inc.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">11. Copyright Policy</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service infringes on the copyright or other intellectual property rights ("Infringement") of any person or entity.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to dmca@hrconnect.com, with the subject line: "Copyright Infringement" and include in your claim a detailed description of the alleged Infringement as detailed below, under "DMCA Notice and Procedure for Copyright Infringement Claims"
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            You may be held accountable for damages (including costs and attorneys' fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through the Service on your copyright.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">12. DMCA Notice and Procedure for Copyright Infringement Claims</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):
          </p>
          
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
            <li>an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright's interest;</li>
            <li>a description of the copyrighted work that you claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work;</li>
            <li>identification of the URL or other specific location on the Service where the material that you claim is infringing is located;</li>
            <li>your address, telephone number, and email address;</li>
            <li>a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;</li>
            <li>a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
          </ul>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            You can contact our Copyright Agent via email at dmca@hrconnect.com
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">13. Error Reporting and Feedback</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            You may provide us either directly at support@hrconnect.com or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service ("Feedback"). You acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; (ii) Company may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information or proprietary information from you or any third party; and (iv) Company is not under any obligation of confidentiality with respect to the Feedback. In the event the transfer of the ownership to the Feedback is not possible due to applicable mandatory laws, you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute and commercialize) Feedback in any manner and for any purpose.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">14. Links To Other Web Sites</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Our Service may contain links to third party web sites or services that are not owned or controlled by HRConnect, Inc.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            HRConnect, Inc. has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            YOU ACKNOWLEDGE AND AGREE THAT HRCONNECT, INC. SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">15. Disclaimer Of Warranty</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            THESE SERVICES ARE PROVIDED BY COMPANY ON AN "AS IS" AND "AS AVAILABLE" BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">16. Limitation Of Liability</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS' FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">17. Termination</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            If you wish to terminate your account, you may simply discontinue using the Service.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">18. Governing Law</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding the Service.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">19. Changes To Service</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the Service, or the entire Service, to users, including registered users.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">20. Amendments To Terms</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            We may amend the Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">21. Waiver And Severability</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            No waiver by Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert a right or provision under Terms shall not constitute a waiver of such right or provision.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">22. Acknowledgement</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">23. Contact Us</h2>
          
          <p className="text-gray-600 dark:text-gray-300">
            Please send your feedback, comments, requests for technical support:
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            By email: legal@hrconnect.com
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            By visiting this page on our website: <Link href="/contact-us" className="text-blue-600 hover:underline dark:text-blue-400">www.hrconnect.com/contact-us</Link>
          </p>
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Related Policies</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Please also review our other policies that govern your use of our services:
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/privacy">
                  <Button variant="outline">Privacy Policy</Button>
                </Link>
                <Link href="/cookies">
                  <Button variant="outline">Cookie Policy</Button>
                </Link>
                <Link href="/security">
                  <Button variant="outline">Security Policy</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
