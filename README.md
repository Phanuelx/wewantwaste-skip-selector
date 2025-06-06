# WeWantWaste Skip Selector - My Redesign

This is my take on redesigning the skip selection page for WeWantWaste. I completely changed the look and feel while keeping all the original functionality working.

## What I Built

I took the original dark-themed grid layout and turned it into something more modern and user-friendly. The new design uses cards instead of a basic grid, has a nice gradient background, and works great on mobile devices.

### Main Changes I Made

**Visual Design:**
- Switched from dark theme to a clean, light design with subtle gradients
- Created card-based layout instead of the original grid
- Added hover effects and smooth animations
- Made the typography much cleaner and easier to read

**Better User Experience:**
- Added "Popular" badges for the most commonly chosen skip sizes (6, 8, 10 yard)
- Clear warning badges for skips that need permits
- Better price display with VAT breakdown
- Selection state is much more obvious now
- Mobile-first responsive design that actually works well

**Technical Stuff:**
- Built with React hooks (useState, useEffect)
- Fetches data from the API endpoint they provided
- Proper error handling if the API is down
- Loading states so users know what's happening
- Clean, readable code with comments

## How It Works

The component fetches skip data from `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft` when it loads. I parse the JSON response and display each skip in its own card with:

- Skip size and description
- Hire period (14 days)
- Whether heavy waste is allowed
- Road placement permissions
- Final price including VAT

When you click a skip, it gets selected and shows a "Continue" button to move to the next step.

## Responsive Design

I made sure this works on all device sizes:
- **Mobile phones** (320px+): Single column layout, touch-friendly buttons
- **Tablets** (768px+): Two column grid 
- **Desktop** (1024px+): Three column grid with full navigation

## Tech Stack

- React 18 with hooks
- Tailwind CSS for styling (utility classes only)
- Lucide React for icons
- Standard fetch API for data loading

## Running Locally

```bash
# Clone the repo
git clone [your-repo-url]
cd skip-selector-redesign

# Install dependencies  
npm install

# Start development server
npm start
```

Open http://localhost:3000 to see it running.

## Key Features

### Price Calculation
I wrote a function to calculate the final price including VAT since the API only gives the pre-VAT amount:

```javascript
const calculateFinalPrice = (priceBeforeVat, vat) => {
  return Math.round(priceBeforeVat * (1 + vat / 100));
};
```

### Skip Descriptions
Added descriptions for each skip size to help users choose the right one. I researched typical use cases for different skip sizes:

```javascript
const getCapacityDescription = (size) => {
  const descriptions = {
    4: "Perfect for small bathroom or kitchen renovations",
    6: "Ideal for single room clearouts and small gardens",
    // ... etc
  };
  return descriptions[size] || "Professional waste management solution";
};
```

### Popular Badge Logic
I marked the most commonly chosen sizes (6, 8, 10 yard) as "Popular" based on typical customer behavior:

```javascript
const isPopular = (size) => {
  return [6, 8, 10].includes(size);
};
```

## Design Decisions

**Why I chose cards over grid:** Cards feel more modern and give each option proper visual weight. The original grid felt cramped and hard to scan.

**Color scheme:** Went with blue as the primary color (matches their branding) with subtle gradients. Used orange/pink for the popular badges to make them stand out.

**Mobile approach:** Started with mobile design first, then enhanced for larger screens. The original wasn't really mobile-friendly.

**Typography:** Used clear hierarchy with proper font weights. The pricing is prominent but not overwhelming.

## What's Different from Original

| Original | My Redesign |
|----------|-------------|
| Dark theme | Light theme with gradients |
| Basic grid | Interactive card layout |
| Static design | Hover effects and animations |
| Limited mobile support | Mobile-first responsive |
| Basic skip info | Rich descriptions and badges |
| Simple selection | Clear visual feedback |

## Browser Support

Tested and working on:
- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Ideas

If I had more time, I'd add:
- Skip size comparison tool
- Waste volume calculator 
- Customer reviews for each size
- Filtering options
- Better accessibility features

## Notes

This was a fun challenge! The original page worked fine but felt dated. My version keeps all the functionality while making it feel more modern and trustworthy. The mobile experience is way better now, and the visual hierarchy makes it easier to compare options.

The API integration was straightforward - just had to handle the VAT calculation and add proper error states. I tried to make the code readable and well-commented so it's easy to maintain.

Total development time was about 8 hours including the redesign planning, coding, testing, and documentation.