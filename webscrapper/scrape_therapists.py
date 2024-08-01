import requests
from bs4 import BeautifulSoup
import re
import json
import time
import gender_guesser.detector as gender

# Initialize the gender detector
d = gender.Detector()

# Define the URL of the website
url = "https://counsellingbc.com/counsellors?page=12"

# Send a request to fetch the HTML content of the page
response = requests.get(url)
response.raise_for_status()  # Ensure we notice bad responses
soup = BeautifulSoup(response.content, "html.parser")

# Find the container that holds the therapist data
therapist_table = soup.find_all("div", class_="l-content")
therapists = therapist_table[0].find_all("div", class_="views-row")

# Extract profile links
profile_links = []
for therapist in therapists:
    link = therapist.find("a", class_="button button--ghost button--rounded")
    if link:
        profile_links.append(link['href'])

# Define a function to extract therapist data from profile page
def extract_therapist_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        # Initialize data dictionary
        data = {
            "name": None,
            "gender": None,
            "certification": None,
            "location": None,
            "description": None,
            "areaOfPractice": [],
            "approachesUsed": [],
            "fee": None,
            "onlineAvailability": "No",
            "inPersonAvailability": "No",
            "phone": None,
            "contactFormUrl": None,
            "website": None,
            "image": None,
        }

        # Extract name
        name_tag = soup.find("h1", class_="c-profile__name")
        if name_tag:
            name = name_tag.text.strip()
            data["name"] = name

            # Guess gender based on the name
            first_name = name.split()[0]
            gender_guess = d.get_gender(first_name)
            if gender_guess in ['male', 'female']:
                data["gender"] = gender_guess.capitalize()
            else:
                data["gender"] = "Other"

        # Extract certification
        certification_tag = soup.find("div", class_="c-profile__credentials")
        if certification_tag:
            # Get text parts and spans
            certifications = certification_tag.stripped_strings
            data["certification"] = list(certifications)

        # Extract location
        location_tag = soup.find("span", class_="location__city")
        if location_tag:
            data["location"] = location_tag.text.strip()

        # Extract description
        description_tag = soup.find("div", class_="c-profile__information")
        if description_tag:
            paragraphs = description_tag.find_all("p")
            description_text = "\n".join([p.get_text(strip=True) for p in paragraphs])
            data["description"] = description_text

        # Extract areas of practice
        area_of_practice_tag = soup.find("div", class_="c-profile__practice-areas")
        if area_of_practice_tag:
            areas_of_practice = []
            for li in area_of_practice_tag.find_all("li"):
                span = li.find("span")
                if span:
                    areas_of_practice.append(span.text.strip())
            data["areaOfPractice"] = areas_of_practice

        # Extract approaches used
        approaches_tag = soup.find("div", class_="c-profile__practice-approach")
        if approaches_tag:
            approaches_used = []
            for li in approaches_tag.find_all("li"):
                span = li.find("span")
                if span:
                    approaches_used.append(span.text.strip())
            data["approachesUsed"] = approaches_used

        # Extract fee
        fee_tag = soup.find("div", class_="c-profile__client-fee-individual")
        if fee_tag:
            fee_text = fee_tag.text.strip()
            fee_match = re.search(r'\$(\d+)', fee_text)
            if fee_match:
                data["fee"] = int(fee_match.group(1))

        # Extract online and in-person availability
        availability_tag = soup.find("div", class_="c-profile__environment--virtual")
        if availability_tag:
            if "Available online only" in availability_tag.text:
                data["onlineAvailability"] = "Yes"
                data["inPersonAvailability"] = "No"
        elif soup.find("div", class_="c-profile__environment--both"):
            data["onlineAvailability"] = "Yes"
            data["inPersonAvailability"] = "Yes"
        else:
            data["onlineAvailability"] = "No"
            data["inPersonAvailability"] = "Yes"

        # Extract phone number
        phone_tag = soup.find("a", class_="button button--ghost button--rounded", href=re.compile(r"^tel:"))
        if phone_tag:
            data["phone"] = phone_tag.text.strip().replace("Call: ", "")

        # Extract contact form URL
        form_tag = soup.find("a", class_="button button--ghost button--rounded", href=re.compile(r"/user/\d+/contact"))
        if form_tag:
            data["contactFormUrl"] = "https://counsellingbc.com" + form_tag["href"]


        # Extract website URL
        website_tag = soup.find("div", class_="c-profile__website")
        if website_tag:
            a_tag = website_tag.find("a")
            if a_tag:
                data["website"] = a_tag["href"]
        
        # Extract image address
        image_tag = soup.find("div", class_="c-profile__image")
        if image_tag:
            img_tag = image_tag.find("img")
            if img_tag:
                data["image"] = img_tag["src"]

        return data

    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve data from {url}: {e}")
        return None

# Iterate through each profile link and extract data
therapist_data_list = []
for link in profile_links:
    data = extract_therapist_data(link)
    if data:
        therapist_data_list.append(data)
    # Adding a short delay to avoid overwhelming the server
    time.sleep(1)

# Save the collected data to a JSON file
with open("therapists.json", "w") as file:
    json.dump(therapist_data_list, file, indent=4)

print("Data saved to therapists.json")