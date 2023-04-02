import requests  # to get image from the web
import shutil  # to save it locally
import json  # to load the json file

abilitiesFile = open('./data/abilities.json', 'r', encoding="cp866")

abilities = json.load(abilitiesFile)

for abilityIndex in abilities:
    if (int(abilityIndex) <= 5479):
        continue
    # Check if the ability is has a name property
    if 'name' not in abilities[abilityIndex]:
        continue

    print(abilities[abilityIndex]['name'])
    ability = abilities[abilityIndex]
    # Set up the image URL and filename
    image_url = "https://cdn.stratz.com/images/dota2/abilities/{a}.png".format(
        a=ability['name'].replace('npc_dota_hero_', ''))
    print(image_url)
    filename = '/assets/images/abilities/' + image_url.split("/")[-1]

    # Open the url image, set stream to True, this will return the stream content.
    r = requests.get(image_url, stream=True)

    # Check if the image was retrieved successfully
    if r.status_code == 200:
        # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
        r.raw.decode_content = True

        # Open a local file with wb ( write binary ) permission.
        with open(filename, 'wb') as f:
            shutil.copyfileobj(r.raw, f)

        print('Image sucessfully Downloaded: ', filename)
    else:
        print('Image Couldn\'t be retreived')
