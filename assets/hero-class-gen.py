import requests  # to get image from the web
import shutil  # to save it locally
import json  # to load the json file

heroesFile = open('./data/heroes.json', 'r', encoding="cp866")

heroes = json.load(heroesFile)


def gen_heroes():

    f = open("./heroIndex.js", "w")

    f.write("export const heroImages = { \n ")

    for heroIndex in heroes:
        print(heroes[heroIndex]['name'])
        hero = heroes[heroIndex]
        filename = '../assets/images/heroes/' + \
            hero['name'].replace('npc_dota_hero_', '') + '_horz.png'

        f.write("'{a}': {{name: '{a}', image: require('{b}')}}, \n ".format(
            a=hero['name'].replace('npc_dota_hero_', ''), b=filename))

    f.write(" } ")
    # write get

    # close the file
    f.close()


def gen_abilities():
    abilitiesFile = open('./data/abilities.json', 'r', encoding="cp866")
    abilities = json.load(abilitiesFile)
    f = open("./abilityIndex.js", "w")

    f.write("export const abilityImages = { \n")

    for hero in heroes:
        for abilityIndex in heroes[hero]['abilities']:
            print(abilityIndex)
            ability = abilities[str(abilityIndex['abilityId'])]
            if 'uri' in ability:
                filename = '../assets/images/abilities/' + \
                    ability['name'] + '.png'
                f.write("'{a}': {{name: '{a}', image: require('{b}')}}, \n ".format(
                    a=ability['name'], b=filename))

    f.write("} ")
    # write get
    f.close()


def main():
    # gen_heroes()
    gen_abilities()


if __name__ == "__main__":
    main()
