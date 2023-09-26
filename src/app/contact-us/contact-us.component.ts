import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  
  faqs = [
    {
      question: 'How can I make a reservation?',
      answer: 'You can make a reservation through our website or by calling our reservations team at [Reservations Phone Number].'
    },
    {
      question: 'What are the check-in and check-out times?',
      answer: 'Check-in time is at 12:00 PM, and check-out time is at 12:00 PM.'
    },
    {
      question: 'Do you offer airport shuttle service?',
      answer: 'Yes, we offer airport shuttle service for our guests. Please contact our concierge for more information.'
    },
    {
      question: 'Are pets allowed in the hotel?',
      answer: 'Yes, we are a pet-friendly hotel. There may be additional fees for bringing your pets. Please check with our staff for details.'
    },
    {
      question: 'Is breakfast included with the room?',
      answer: 'Yes, a complimentary breakfast is included with your stay. Enjoy a variety of options at our breakfast buffet.'
    },
    {
      question: 'Can I modify or cancel my reservation?',
      answer: 'Yes, you can modify or cancel your reservation. Please visit our website or contact our reservations team for assistance.'
    },
    {
      question: 'Is there a gym or fitness center?',
      answer: 'Yes, we have a fully equipped fitness center available for our guests to use during their stay.'
    },
    {
      question: 'Do you have meeting and event spaces?',
      answer: 'Yes, we have versatile meeting and event spaces that can accommodate various group sizes. Contact our events team for more information.'
    },
    {
      question: 'Is Wi-Fi available in the rooms?',
      answer: 'Yes, complimentary Wi-Fi is available in all guest rooms and public areas of the hotel.'
    },
    {
      question: 'Do you offer room service?',
      answer: 'Yes, we offer 24-hour room service with a variety of delicious menu options.'
    }
  ];

}
