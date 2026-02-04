const FRAME_WIDTH = 63;
const FRAME_HEIGHT = 56;
const SHEET_KEY = "brooke-sheet";
const CAKE_KEY = "cake-island";

const LYRICS_WORDS = [
  "Happy",
  "birthday",
  "to",
  "you",
  "Happy",
  "birthday",
  "to",
  "you",
  "Happy",
  "birthday",
  "to",
  "Brooke",
  "Happy",
  "birthday",
  "to",
  "you",
];

const CLOSED_MS = 200;
const LETTER_MS = 200;

const countLetters = (word) => {
  const matches = word.match(/[A-Za-z]/g);
  return matches ? matches.length : 0;
};

const buildSingFrames = (words) => {
  const frames = [];

  words.forEach((word) => {
    frames.push({ frame: 6, duration: CLOSED_MS });

    const letterCount = countLetters(word);
    const openDuration = Math.max(LETTER_MS, letterCount * LETTER_MS);
    frames.push({ frame: 7, duration: openDuration });
  });

  frames.push({ frame: 6, duration: CLOSED_MS });
  return frames;
};

class BirthdayScene extends Phaser.Scene {
  constructor() {
    super("BirthdayScene");
    this.words = [];
    this.wordIndex = 0;
    this.char1 = null;
    this.char2 = null;
    this.dialog = null;
    this.cake = null;
    this.starLayer = null;
    this.starTweens = [];
  }

  preload() {
    this.load.spritesheet(SHEET_KEY, "assets/spritesheet.png", {
      frameWidth: FRAME_WIDTH,
      frameHeight: FRAME_HEIGHT,
    });
    this.load.image(CAKE_KEY, "assets/cake-island.png");
  }

  create() {
    if (!this.textures.exists(SHEET_KEY)) {
      this.add
        .text(
          40,
          40,
          "Missing spritesheet. Place it at assets/spritesheet.png",
          {
            fontFamily: "Georgia, serif",
            fontSize: "22px",
            color: "#ffffff",
          }
        )
        .setOrigin(0, 0);
      return;
    }

    this.words = LYRICS_WORDS.slice();
    this.createAnimations();

    this.createStars();
    this.createCakeIsland();

    this.char1 = this.add.sprite(0, 0, SHEET_KEY, 0).setOrigin(1, 1);
    this.char2 = this.add.sprite(0, 0, SHEET_KEY, 6).setOrigin(0.5, 1);

    this.char1.play("char1-idle");
    this.char2.play("char2-sing");

    this.dialog = this.add.text(0, 0, "", {
      fontFamily: "Georgia, serif",
      fontSize: "20px",
      color: "#ffffff",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      padding: { left: 10, right: 10, top: 6, bottom: 6 },
      wordWrap: { width: 360 },
    });
    this.dialog.setOrigin(0, 1);
    this.dialog.setDepth(3);

    this.char2.on("animationupdate", (anim, frame, gameObject, frameKey) => {
      const textureFrame =
        typeof frameKey !== "undefined"
          ? frameKey
          : typeof frame.textureFrame !== "undefined"
            ? frame.textureFrame
            : frame.frame && typeof frame.frame.name !== "undefined"
              ? frame.frame.name
              : frame.index;
      const numericFrame = Number(textureFrame);

      if (numericFrame === 7 && this.wordIndex < this.words.length) {
        const nextWord = this.words[this.wordIndex];
        this.wordIndex += 1;

        const prior = this.dialog.text.trim();
        const updated = prior.length ? `${prior} ${nextWord}` : nextWord;
        this.dialog.setText(updated);
      }
    });

    this.scale.on("resize", this.layout, this);
    this.layout();
  }

  createAnimations() {
    if (!this.anims.exists("char1-idle")) {
      this.anims.create({
        key: "char1-idle",
        frames: this.anims.generateFrameNumbers(SHEET_KEY, {
          start: 0,
          end: 1,
        }),
        frameRate: 3,
        repeat: -1,
      });
    }

    const singFrames = buildSingFrames(this.words);

    if (!this.anims.exists("char2-sing")) {
      this.anims.create({
        key: "char2-sing",
        defaultTextureKey: SHEET_KEY,
        frames: singFrames,
        duration: 1,
        repeat: 0,
      });
    }
  }

  layout() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.layoutStars();

    if (this.cake) {
      this.cake.setPosition(width / 2, height * 0.55);
      const scale = Math.min(width / 700, height / 520);
      this.cake.setScale(Math.max(0.7, Math.min(1.2, scale)));
    }

    if (this.char1) {
      this.char1.setPosition(width, height);
      this.char1.setDepth(2);
    }

    if (this.char2) {
      this.char2.setPosition(width / 2, height);
      this.char2.setDepth(2);
    }

    if (this.dialog && this.char2) {
      const center = this.char2.getCenter();
      this.dialog.setPosition(center.x, center.y);
      const wrapWidth = Math.max(240, Math.min(420, width - 40));
      if (typeof this.dialog.setWordWrapWidth === "function") {
        this.dialog.setWordWrapWidth(wrapWidth);
      } else {
        this.dialog.setStyle({ wordWrap: { width: wrapWidth } });
      }
    }
  }

  createStars() {
    if (this.starLayer) {
      this.starLayer.destroy(true);
    }
    this.starTweens.forEach((tween) => tween.remove());
    this.starTweens = [];

    this.starLayer = this.add.container(0, 0).setDepth(0);
    this.layoutStars();
  }

  layoutStars() {
    if (!this.starLayer) {
      return;
    }

    this.starLayer.removeAll(true);
    this.starTweens.forEach((tween) => tween.remove());
    this.starTweens = [];

    const width = this.scale.width;
    const height = this.scale.height;
    const starCount = Math.round((width * height) / 24000);

    for (let i = 0; i < starCount; i += 1) {
      const x = Phaser.Math.Between(20, width - 20);
      const y = Phaser.Math.Between(20, height - 20);
      const radius = Phaser.Math.Between(1, 2);
      const star = this.add.circle(x, y, radius, 0xffffff, 0.8);
      star.setDepth(0);
      this.starLayer.add(star);

      const tween = this.tweens.add({
        targets: star,
        alpha: Phaser.Math.FloatBetween(0.2, 1),
        duration: Phaser.Math.Between(900, 2000),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 1200),
      });
      this.starTweens.push(tween);
    }
  }

  createCakeIsland() {
    if (!this.textures.exists(CAKE_KEY)) {
      this.add
        .text(
          40,
          70,
          "Missing cake image. Place it at assets/cake-island.png",
          {
            fontFamily: "Georgia, serif",
            fontSize: "18px",
            color: "#ffffff",
          }
        )
        .setOrigin(0, 0)
        .setDepth(4);
      return;
    }

    this.cake = this.add.image(0, 0, CAKE_KEY).setOrigin(0.5, 0.5);
    this.cake.setDepth(1);
    this.tweens.add({
      targets: this.cake,
      y: "-=12",
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 900,
  height: 540,
  backgroundColor: "#0e1016",
  pixelArt: true,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 900,
    height: 540,
  },
  scene: [BirthdayScene],
};

const game = new Phaser.Game(config);
globalThis.__PHASER_GAME__ = game;
