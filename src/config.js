// Apni lab ki details yahan badlein
export const LAB = {
  name: 'MED ONE LAB DIGITAL',
  tagline: 'Healthcare & Digital Solutions Under One Roof',
  phone: '0321 4790619',
  whatsapp: '923214790619', // country code ke saath, + aur dash ke baghair
  email: 'info@medonelab.com',
  hours: 'Call for hours',
  address: 'Med One Lab, Ali Block, near Rizwan Park, Awan Town, Lahore',
  credentials: [
    { title: 'Add your accreditation', text: 'PHC license, DRAP, ISO or CAP certificate yahan likhein.' },
    { title: 'Qualified pathologists', text: 'Apni team ki qualifications aur experience likhein.' },
    { title: 'Quality control', text: 'Apni quality process ka short summary likhein.' },
  ],
};

export const waLink = (text) =>
  `https://wa.me/${LAB.whatsapp}?text=${encodeURIComponent(text)}`;
