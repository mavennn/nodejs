function Game(title, description, age) {
    return {
        title,
        description,
        age
    }
}

const games = [
    Game("The Witcher 3: Wild Hunt", "«Ведьмак 3: Дикая Охота» — это сюжетная ролевая игра с открытым миром. Её действие разворачивается в поразительной волшебной вселенной, и любое ваше решение может повлечь за собой серьёзные последствия. Вы играете за профессионального охотника на монстров Геральта из Ривии, которому поручено найти Дитя предназначения в огромном мире, полном торговых городов, пиратских островов, опасных горных перевалов и заброшенных пещер.", 18),
    Game("Metro: Exodus", "The year is 2036.\n" +
        "\n" +
        "A quarter-century after nuclear war devastated the earth, a few thousand survivors still cling to existence beneath the ruins of Moscow, in the tunnels of the Metro.\n" +
        "\n" +
        "They have struggled against the poisoned elements, fought mutated beasts and paranormal horrors, and suffered the flames of civil war.\n" +
        "\n" +
        "But now, as Artyom, you must flee the Metro and lead a band of Spartan Rangers on an incredible, continent-spanning journey across post-apocalyptic Russia in search of a new life in the East.", 18),
    Game("Among Us", "Play with 4-10 player online or via local WiFi as you attempt to prepare your spaceship for departure, but beware as one or more random players among the Crew are Impostors bent on killing everyone!\n" +
        "\n" +
        "Originally created as a party game, we recommend playing with friends at a LAN party or online using voice chat. Enjoy cross-platform play between Android, iOS and PC.", 0),
    Game("Minecraft", "\n" +
        "In this five part episodic series, you’ll embark on a perilous adventure across the Overworld, through the Nether, to the End, and beyond. You and your friends revere the legendary Order of the Stone: Warrior, Redstone Engineer, Griefer, and Architect; slayers of the Ender Dragon. While at EnderCon in hopes of meeting Gabriel the Warrior, you and your friends discover that something is wrong… something dreadful. Terror is unleashed, and you must set out on a quest to find The Order of the Stone if you are to save your world from oblivion.", 8),
    Game("Assasins's Creed: Brotherhood", "Живите и дышите, как Эцио, легендарный Ассасин-мастер, сражающийся против Тамплиеров. Он должен попасть в самый большой город Италии, Рим, центр власти, алчности и коррупции, где он ударит прямо в сердце врага.\n" +
        "\n" +
        "Чтобы победить коррумпированных тиранов, обосновавшихся там, нужны не только силы, но и лидерские качества, какие есть у Эцио, идущего на битву вместе с Братством Ассасинов. Только сражаясь бок о бок Ассасины победят своих заклятых врагов.", 16),
    Game("Dota 2", "Самая популярная игра в Steam\n" +
        "Ежедневно миллионы игроков по всему миру вступают в битву от лица одного из более сотни героев Dota 2. Неважно, будет это десятый или тысячный час в игре — в ней всегда есть место чему-то новому. Регулярные обновления не дают стоять на месте игровому процессу, возможностям и героям, отчего Dota 2 поистине живёт собственной жизнью.", 18),
    Game("Terraria", "Dig, Fight, Explore, Build: The very world is at your fingertips as you fight for survival, fortune, and glory. Will you delve deep into cavernous expanses in search of treasure and raw materials with which to craft ever-evolving gear, machinery, and aesthetics? Perhaps you will choose instead to seek out ever-greater foes to test your mettle in combat? Maybe you will decide to construct your own city to house the host of mysterious allies you may encounter along your travels?", 8),
]

module.exports = games;