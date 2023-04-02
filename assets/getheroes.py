import requests  # to get image from the web
import shutil  # to save it locally
import json  # to load the json file

heroesFile = open('./data/heroes.json', 'r', encoding="cp866")

heroes = json.load(heroesFile)

for heroIndex in heroes:
    print(heroes[heroIndex]['name'])
    hero = heroes[heroIndex]
    # Set up the image URL and filename
    image_url = "https://cdn.stratz.com/images/dota2/heroes/{a}_horz.png".format(
        a=hero['name'].replace('npc_dota_hero_', ''))
    print(image_url)
    filename = 'images/heroes/' + image_url.split("/")[-1]

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
