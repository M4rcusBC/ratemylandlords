-- Rate My Landlords: Real Landlord & Property Management Seeding Dataset

INSERT OR REPLACE INTO landlords (id, name, city, state, address, latitude, longitude, created_at) VALUES
  ('ll-greystar-austin', 'Greystar Real Estate Partners', 'Austin', 'TX', '4600 Mueller Blvd', 30.3015, -97.7058, 1714521600000),
  ('ll-greystar-denver', 'Greystar Real Estate Partners', 'Denver', 'CO', '1901 Arapahoe St', 39.7523, -104.9932, 1714608000000),
  ('ll-avalon-nyc', 'AvalonBay Communities', 'New York', 'NY', '1100 1st Avenue', 40.7608, -73.9612, 1714694400000),
  ('ll-avalon-seattle', 'AvalonBay Communities', 'Seattle', 'WA', '2800 1st Avenue', 47.6186, -122.3533, 1714780800000),
  ('ll-equity-chicago', 'Equity Residential', 'Chicago', 'IL', '200 N Dearborn St', 41.8864, -87.6297, 1714867200000),
  ('ll-equity-sf', 'Equity Residential', 'San Francisco', 'CA', '340 Fremont St', 37.7895, -122.3942, 1714953600000),
  ('ll-lincoln-dallas', 'Lincoln Property Company', 'Dallas', 'TX', '2000 McKinney Ave', 32.7906, -96.8005, 1715040000000),
  ('ll-camden-houston', 'Camden Property Trust', 'Houston', 'TX', '11 Greenway Plaza', 29.7314, -95.4338, 1715126400000),
  ('ll-camden-atlanta', 'Camden Property Trust', 'Atlanta', 'GA', '3200 Lenox Rd NE', 33.8427, -84.3597, 1715212800000),
  ('ll-essex-sanjose', 'Essex Property Trust', 'San Jose', 'CA', '110 S Market St', 37.3346, -121.8906, 1715299200000),
  ('ll-maa-nashville', 'Mid-America Apartment Communities (MAA)', 'Nashville', 'TN', '1201 Demonbreun St', 36.1534, -86.7876, 1715385600000),
  ('ll-related-miami', 'Related Companies', 'Miami', 'FL', '330 S Miami Ave', 25.7712, -80.1936, 1715472000000),
  ('demo-green-valley', 'Green Valley Properties', 'Springfield', 'CA', '410 Main St', 37.9577, -121.2908, 1714521600000);

-- Reviews for Greystar Austin
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-gs-atx-1', 'll-greystar-austin', 4, 'Living at their Mueller community was generally pleasant. Maintenance requests submitted via the resident portal were handled within 48 hours. The pool and gym were regularly maintained. Move-out inspection was fair, though cleaning fee deductions felt slightly elevated.', '["Maintains Property","Quick Repairs","Clear Communication"]', 1717200000000),
  ('rev-gs-atx-2', 'll-greystar-austin', 2, 'Communication with the leasing office was frustrating whenever staff changed. Package delivery was disorganized during the holidays. When our HVAC failed during summer, it took 4 days for parts. Received only half of our deposit back without an itemized invoice until we insisted.', '["Transparent Fees"]', 1718500000000),
  ('rev-gs-atx-3', 'll-greystar-austin', 5, 'Great experience overall. On-site staff was very respectful, and parking management is strictly enforced so reserved spots are never taken. Seamless lease renewal process with fair rent adjustments.', '["Respectful","Responsive","Quiet Building"]', 1721000000000),
  ('rev-gs-atx-4', 'll-greystar-austin', 4, 'Modern units and great soundproofing between walls. Landscaping is always clean. A little corporate in their lease renewal notices, but repair workers are courteous and efficient.', '["Quick Repairs","Maintains Property","Pet Friendly"]', 1723500000000);

-- Reviews for Greystar Denver
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-gs-den-1', 'll-greystar-denver', 3, 'Centrally located building downtown. Facilities are good, but elevator repairs took weeks twice during our stay. Onsite maintenance team is hardworking, but the corporate management office is slow to answer emails.', '["Maintains Property"]', 1718200000000),
  ('rev-gs-den-2', 'll-greystar-denver', 4, 'Very dog-friendly community with dedicated pet wash stations. Snow removal in the winter was prompt. Rent was predictable with no surprise utility add-ons.', '["Pet Friendly","Clear Communication","Fair Deposit Return"]', 1720500000000);

-- Reviews for AvalonBay NYC
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-av-nyc-1', 'll-avalon-nyc', 5, 'AvalonBay in Manhattan provided the best rental experience I have had in New York. Concierge desk was wonderful, service tickets were usually completed same day, and common lounges are spotless. Got my full deposit back within 14 days of moving out.', '["Responsive","Fair Deposit Return","Clear Communication","Quick Repairs"]', 1716900000000),
  ('rev-av-nyc-2', 'll-avalon-nyc', 4, 'High standard of building upkeep. The building engineer is fantastic. It is on the pricier end, but they do not hit you with hidden utility markups. Package room is digital and secure.', '["Transparent Fees","Maintains Property","Quiet Building"]', 1719200000000),
  ('rev-av-nyc-3', 'll-avalon-nyc', 4, 'Quiet residential experience in Midtown East. Front desk was always welcoming. Very clear move-in checklist which saved us when moving out. Professional management team.', '["Respectful","Easy Move-in","Clear Communication"]', 1722800000000);

-- Reviews for AvalonBay Seattle
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-av-sea-1', 'll-avalon-seattle', 5, 'Super responsive onsite management in Belltown. Whenever a washer or disposal had an issue, tech was there the next morning. Pet amenities are well kept and community feels safe.', '["Responsive","Quick Repairs","Pet Friendly"]', 1718000000000),
  ('rev-av-sea-2', 'll-avalon-seattle', 4, 'Clean, modern finishes. Fair deposit return process with transparent inspection pictures provided before move out. Solid 2-year lease experience.', '["Fair Deposit Return","Clear Communication"]', 1721500000000);

-- Reviews for Equity Residential Chicago
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-eq-chi-1', 'll-equity-chicago', 5, 'Exceptional doormen and property maintenance. During the Chicago deep freeze, heating was reliable and pipes were monitored proactively. Move-in was seamless with reserved service elevator.', '["Easy Move-in","Maintains Property","Responsive"]', 1717800000000),
  ('rev-eq-chi-2', 'll-equity-chicago', 4, 'Equity has a solid resident app where you can track maintenance and pay rent easily. The maintenance techs always leave a note explaining what was fixed. Only downside was gym equipment took a bit to replace.', '["Quick Repairs","Clear Communication","Respectful"]', 1720200000000),
  ('rev-eq-chi-3', 'll-equity-chicago', 3, 'Nice high-rise views and convenient Loop location. Rent increases at renewal were steeper than expected, but they were willing to negotiate a 15-month extension.', '["Transparent Fees"]', 1723100000000);

-- Reviews for Equity Residential San Francisco
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-eq-sf-1', 'll-equity-sf', 4, 'SOMA building is secure and well-insulated from street traffic noise. Maintenance crew is top notch and always takes off their shoes or uses boot covers. Deposit returned promptly.', '["Quiet Building","Respectful","Fair Deposit Return"]', 1718900000000),
  ('rev-eq-sf-2', 'll-equity-sf', 3, 'The garage door broke twice causing delays, but communication about repairs was transparent. Good community events organized by leasing staff.', '["Clear Communication","Maintains Property"]', 1722000000000);

-- Reviews for Lincoln Property Company Dallas
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-lpc-dal-1', 'll-lincoln-dallas', 5, 'Lincoln Property manages Uptown properties with genuine hospitality. The staff in the leasing office knows residents by name. Prompt AC servicing and very clean pool area.', '["Responsive","Respectful","Maintains Property","Quick Repairs"]', 1719500000000),
  ('rev-lpc-dal-2', 'll-lincoln-dallas', 4, 'Fair deposit return without ridiculous carpet replacement charges. Easy parking for guests and reliable trash valet service.', '["Fair Deposit Return","Transparent Fees"]', 1722500000000);

-- Reviews for Camden Houston
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-cam-hou-1', 'll-camden-houston', 5, 'Camden has earned their reputation. Their 30-day satisfaction guarantee gave us confidence when relocating from out of state. Super fast repair response, typically under 24 hours.', '["Responsive","Quick Repairs","Easy Move-in"]', 1717500000000),
  ('rev-cam-hou-2', 'll-camden-houston', 5, 'Best landlord I have had in Houston. Security deposit was returned in full within 10 days. The grounds are lush and beautifully manicured year-round.', '["Fair Deposit Return","Maintains Property","Respectful"]', 1721800000000),
  ('rev-cam-hou-3', 'll-camden-houston', 4, 'Great soundproofing and friendly neighbors. Onsite team handles pest control and air filter changes proactively every quarter.', '["Quiet Building","Maintains Property","Clear Communication"]', 1724200000000);

-- Reviews for Camden Atlanta
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-cam-atl-1', 'll-camden-atlanta', 4, 'Buckhead location is unbeatable. Gated access is reliable and the fitness center is clean with modern Peloton bikes. Clear rules and respectful management.', '["Respectful","Maintains Property","Quiet Building"]', 1719000000000),
  ('rev-cam-atl-2', 'll-camden-atlanta', 5, 'We lived here for 3 years before buying our first house. Move-out process was painless. We did a walk-through with the manager and agreed on minor paint touch-ups without dispute.', '["Fair Deposit Return","Clear Communication","Responsive"]', 1723000000000);

-- Reviews for Essex San Jose
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-es-sj-1', 'll-essex-sanjose', 4, 'Downtown San Jose building close to transit. Underground parking is secure. Maintenance team fixed a leaking sink within 3 hours on a Saturday afternoon.', '["Quick Repairs","Responsive","Maintains Property"]', 1718800000000),
  ('rev-es-sj-2', 'll-essex-sanjose', 3, 'Rent is steep for Silicon Valley, but the apartment features EV charging spots which worked reliably. Move-out inspection took a modest cleaning fee.', '["Transparent Fees","Pet Friendly"]', 1721200000000);

-- Reviews for MAA Nashville
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-maa-bna-1', 'll-maa-nashville', 5, 'The Gulch location is walking distance to everything. Friendly maintenance guys who wave in the hallways and fix issues right away. Deposit return was 100% fair.', '["Responsive","Quick Repairs","Fair Deposit Return","Respectful"]', 1719800000000),
  ('rev-maa-bna-2', 'll-maa-nashville', 4, 'Great amenities including rooftop lounge and coffee bar. Clear email notifications for package arrivals and maintenance notices.', '["Clear Communication","Maintains Property"]', 1722600000000);

-- Reviews for Related Miami
INSERT OR REPLACE INTO reviews (id, landlord_id, rating, comment, tags, created_at) VALUES
  ('rev-rel-mia-1', 'll-related-miami', 5, 'Luxury rental standard in Brickell. Staff is impeccably trained and handles everything with white-glove attention. Hurricane shutters and backup generators are tested regularly.', '["Maintains Property","Respectful","Responsive"]', 1718300000000),
  ('rev-rel-mia-2', 'll-related-miami', 4, 'High-end finishes and appliances. Soundproofing is excellent despite being in the center of the city. Transparent fee structure with no surprise utility markup.', '["Quiet Building","Transparent Fees","Clear Communication"]', 1722200000000);

