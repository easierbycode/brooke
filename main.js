const FRAME_WIDTH = 63;
const FRAME_HEIGHT = 56;
const BACKGROUND_COLOR = 0x05065a;
const STAR_COLORS = [0x9feaff, 0x6fd3ff, 0x4aa8ff, 0x2f6bff];
const SHEET_KEY = "brooke-sheet";
const SPRITESHEET_DATA_URL = [
  "data:image/png;base64,",
  "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",
  "AAAAAElFTkSuQmCC"
].join("");
const CAKE_DATA_URL = [
  "data:image/png;base64,",
  "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"
].join("");

const CAKE_KEY = "cake-island";
const MONSTER_EYE_KEY = "monster-eye";
const MONSTER_EYE_URL = "https://assets.codepen.io/11817390/evil-brain-eye.png";
const MONSTER_EYE_FRAME_WIDTH = 22;
const MONSTER_EYE_FRAME_HEIGHT = 10;
const MONSTER_BOUNCE_SPEED = 140;
const BROOKE_BOUNCE_SPEED = 135;
const COLLISION_TEXT_PARTICLE_LIFESPAN_MS = 2000;
const COLLISION_PARTICLE_COOLDOWN_MS = 140;

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
    this.monsterContainer = null;
    this.monsterImage = null;
    this.monsterEyes = [];
    this.monsterVelocity = { x: MONSTER_BOUNCE_SPEED, y: MONSTER_BOUNCE_SPEED };
    this.monsterPosition = { x: 0, y: 0 };
    this.monsterPointer = { x: 0, y: 0 };
    this.brookeContainer = null;
    this.brookePosition = { x: 0, y: 0 };
    this.brookeVelocity = { x: -BROOKE_BOUNCE_SPEED, y: BROOKE_BOUNCE_SPEED };
    this.lastCollisionParticleAt = -Infinity;
  }

  preload() {
    this.load.spritesheet(SHEET_KEY, SPRITESHEET_DATA_URL, {
      frameWidth: FRAME_WIDTH,
      frameHeight: FRAME_HEIGHT,
    });
    this.load.image(CAKE_KEY, CAKE_DATA_URL);
    this.load.spritesheet(MONSTER_EYE_KEY, MONSTER_EYE_URL, {
      frameWidth: MONSTER_EYE_FRAME_WIDTH,
      frameHeight: MONSTER_EYE_FRAME_HEIGHT,
    });
  }

  create() {
    if (!this.textures.exists(SHEET_KEY)) {
      this.add
        .text(
          40,
          40,
          "Embedded spritesheet failed to load",
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
    this.applyPixelArtFilters();
    this.createAnimations();

    this.createStars();
    this.createCakeIsland();
    this.setupMonsterEyes();

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
      const targetScale = Math.min(width / 700, height / 520);
      const snappedScale = Math.max(
        0.5,
        Math.min(2, Math.round(targetScale * 2) / 2)
      );
      this.cake.setScale(snappedScale);
      this.cake.setPosition(Math.round(width / 2), Math.round(height * 0.55));
    }

    if (this.char1) {
      this.char1.setPosition(Math.round(width), Math.round(height));
      this.char1.setDepth(2);
    }

    if (this.char2) {
      this.char2.setPosition(Math.round(width / 2), Math.round(height));
      this.char2.setDepth(2);
    }

    if (this.dialog && this.char2) {
      const center = this.char2.getCenter();
      this.dialog.setPosition(Math.round(center.x), Math.round(center.y));
      const wrapWidth = Math.max(240, Math.min(420, width - 40));
      if (typeof this.dialog.setWordWrapWidth === "function") {
        this.dialog.setWordWrapWidth(wrapWidth);
      } else {
        this.dialog.setStyle({ wordWrap: { width: wrapWidth } });
      }
    }
  }

  applyPixelArtFilters() {
    const setNearest = (key) => {
      const texture = this.textures.get(key);
      if (texture && typeof texture.setFilter === "function") {
        texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
      }
    };

    setNearest(SHEET_KEY);
    setNearest(CAKE_KEY);
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
      const color =
        STAR_COLORS[Phaser.Math.Between(0, STAR_COLORS.length - 1)];
      const baseAlpha = Phaser.Math.FloatBetween(0.5, 0.9);
      const star = this.add.circle(x, y, radius, color, baseAlpha);
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
          "Embedded cake image failed to load",
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
    if (typeof this.cake.setRoundPixels === "function") {
      this.cake.setRoundPixels(true);
    }
    this.tweens.add({
      targets: this.cake,
      y: "-=12",
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  setupMonsterEyes() {
    this.monsterContainer = document.getElementById("monster-container");
    this.monsterImage = document.getElementById("monster-image");
    this.brookeContainer = document.getElementById("brooke-bounce-container");

    if (!this.monsterContainer || !this.monsterImage) {
      return;
    }

    this.monsterPointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    window.addEventListener("mousemove", (event) => {
      this.monsterPointer = { x: event.clientX, y: event.clientY };
    });

    this.monsterEyes = [
      this.add
        .sprite(0, 0, MONSTER_EYE_KEY, 2)
        .setOrigin(0.5, 0.5)
        .setScale(2.4)
        .setDepth(5)
        .setFlipX(true),
      this.add
        .sprite(0, 0, MONSTER_EYE_KEY, 2)
        .setOrigin(0.5, 0.5)
        .setScale(2.4)
        .setDepth(5)
        .setFlipX(false),
    ];

    this.monsterEyes.forEach((eye) => eye.setVisible(false));

    const viewport = this.getViewportSize();
    this.monsterPosition = {
      x: Math.max(20, viewport.width * 0.1),
      y: Math.max(20, viewport.height * 0.15),
    };

    this.brookePosition = {
      x: Math.max(20, viewport.width * 0.62),
      y: Math.max(20, viewport.height * 0.5),
    };

    this.applyMonsterPosition();
    this.applyBrookePosition();
  }

  update(time, delta) {
    this.updateBouncingContainers(delta);
    this.updateMonsterEyes();
  }

  updateBouncingContainers(delta) {
    if (!this.monsterContainer || !this.brookeContainer) {
      return;
    }

    const viewport = this.getViewportSize();
    const monsterRect = this.getRectData(this.monsterContainer);
    const brookeRect = this.getRectData(this.brookeContainer);
    const dt = Math.min(delta / 1000, 0.05);

    this.monsterPosition.x += this.monsterVelocity.x * dt;
    this.monsterPosition.y += this.monsterVelocity.y * dt;
    this.brookePosition.x += this.brookeVelocity.x * dt;
    this.brookePosition.y += this.brookeVelocity.y * dt;

    this.bounceInsideViewport(
      this.monsterPosition,
      this.monsterVelocity,
      monsterRect,
      viewport
    );
    this.bounceInsideViewport(
      this.brookePosition,
      this.brookeVelocity,
      brookeRect,
      viewport
    );

    this.resolveContainerCollision(monsterRect, brookeRect);

    this.applyMonsterPosition();
    this.applyBrookePosition();
  }

  bounceInsideViewport(position, velocity, size, viewport) {
    if (position.x <= 0) {
      position.x = 0;
      velocity.x = Math.abs(velocity.x);
    } else if (position.x + size.width >= viewport.width) {
      position.x = viewport.width - size.width;
      velocity.x = -Math.abs(velocity.x);
    }

    if (position.y <= 0) {
      position.y = 0;
      velocity.y = Math.abs(velocity.y);
    } else if (position.y + size.height >= viewport.height) {
      position.y = viewport.height - size.height;
      velocity.y = -Math.abs(velocity.y);
    }
  }

  resolveContainerCollision(monsterRect, brookeRect) {
    const a = {
      x: this.monsterPosition.x,
      y: this.monsterPosition.y,
      width: monsterRect.width,
      height: monsterRect.height,
    };
    const b = {
      x: this.brookePosition.x,
      y: this.brookePosition.y,
      width: brookeRect.width,
      height: brookeRect.height,
    };

    const overlapX = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
    const overlapY = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);

    if (overlapX <= 0 || overlapY <= 0) {
      return;
    }

    this.emitCollisionTextParticles(monsterRect, brookeRect, "Brooke", "Sawyer");

    if (overlapX < overlapY) {
      const separation = overlapX / 2;
      if (a.x < b.x) {
        this.monsterPosition.x -= separation;
        this.brookePosition.x += separation;
      } else {
        this.monsterPosition.x += separation;
        this.brookePosition.x -= separation;
      }
      const temp = this.monsterVelocity.x;
      this.monsterVelocity.x = this.brookeVelocity.x;
      this.brookeVelocity.x = temp;
    } else {
      const separation = overlapY / 2;
      if (a.y < b.y) {
        this.monsterPosition.y -= separation;
        this.brookePosition.y += separation;
      } else {
        this.monsterPosition.y += separation;
        this.brookePosition.y -= separation;
      }
      const temp = this.monsterVelocity.y;
      this.monsterVelocity.y = this.brookeVelocity.y;
      this.brookeVelocity.y = temp;
    }
  }

  emitCollisionTextParticles(leftRect, rightRect, leftText, rightText) {
    if (this.time.now - this.lastCollisionParticleAt < COLLISION_PARTICLE_COOLDOWN_MS) {
      return;
    }
    this.lastCollisionParticleAt = this.time.now;

    this.emitDomCollisionTextBurst(
      this.monsterPosition.x + leftRect.width / 2,
      this.monsterPosition.y + leftRect.height / 2,
      leftText
    );
    this.emitDomCollisionTextBurst(
      this.brookePosition.x + rightRect.width / 2,
      this.brookePosition.y + rightRect.height / 2,
      rightText
    );
  }

  emitDomCollisionTextBurst(originX, originY, text) {
    const particleCount = 20;
    const gravityY = 50;

    for (let i = 0; i < particleCount; i += 1) {
      const span = document.createElement("span");
      span.className = "collision-text-particle";
      span.textContent = text;
      span.style.position = "fixed";
      span.style.left = `${originX}px`;
      span.style.top = `${originY}px`;
      span.style.transform = "translate(-50%, -50%) scale(0.5)";
      span.style.transformOrigin = "center center";
      span.style.fontFamily = "Georgia, serif";
      span.style.fontSize = "28px";
      span.style.fontWeight = "700";
      span.style.color = "#ffffff";
      span.style.mixBlendMode = "screen";
      span.style.willChange = "transform, opacity";
      span.style.pointerEvents = "none";
      span.style.zIndex = "30";

      const angle = Math.random() * Math.PI * 2;
      const speed = Phaser.Math.FloatBetween(50, 100);
      const durationS = COLLISION_TEXT_PARTICLE_LIFESPAN_MS / 1000;
      const travelX = Math.cos(angle) * speed * durationS;
      const travelY =
        Math.sin(angle) * speed * durationS + 0.5 * gravityY * durationS * durationS;

      document.body.appendChild(span);

      span.animate(
        [
          { transform: "translate(-50%, -50%) scale(0.5)", opacity: 1 },
          {
            transform: `translate(calc(-50% + ${travelX}px), calc(-50% + ${travelY}px)) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: COLLISION_TEXT_PARTICLE_LIFESPAN_MS,
          easing: "ease-out",
          fill: "forwards",
        }
      );

      window.setTimeout(() => {
        span.remove();
      }, COLLISION_TEXT_PARTICLE_LIFESPAN_MS + 100);
    }
  }

  getRectData(element) {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width || element.offsetWidth,
      height: rect.height || element.offsetHeight,
    };
  }

  updateMonsterEyes() {
    if (!this.monsterContainer || !this.monsterImage || !this.monsterEyes.length) {
      return;
    }

    if (!this.monsterImage.complete) {
      return;
    }

    const rect = this.monsterImage.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const anchors = this.getMonsterAnchors();
    if (!anchors) {
      return;
    }

    const canvasRect = this.game.canvas.getBoundingClientRect();
    const scaleX = this.scale.width / canvasRect.width;
    const scaleY = this.scale.height / canvasRect.height;
    const toWorld = (clientX, clientY) => ({
      x: (clientX - canvasRect.left) * scaleX,
      y: (clientY - canvasRect.top) * scaleY,
    });

    const leftAnchor = toWorld(
      rect.left + rect.width * anchors.left.x,
      rect.top + rect.height * anchors.left.y
    );
    const rightAnchor = toWorld(
      rect.left + rect.width * anchors.right.x,
      rect.top + rect.height * anchors.right.y
    );

    this.monsterEyes[0].setPosition(leftAnchor.x, leftAnchor.y);
    this.monsterEyes[1].setPosition(rightAnchor.x, rightAnchor.y);
    this.monsterEyes.forEach((eye) => eye.setVisible(true));

    const pointer = toWorld(this.monsterPointer.x, this.monsterPointer.y);
    const boundsLeft = toWorld(rect.left, rect.top).x;
    const boundsRight = toWorld(rect.right, rect.top).x;

    this.monsterEyes.forEach((eye) => {
      if (pointer.x < boundsLeft) {
        eye.setFrame(eye.flipX ? 3 : 1);
      } else if (pointer.x > boundsRight) {
        eye.setFrame(eye.flipX ? 1 : 3);
      } else {
        eye.setFrame(2);
      }
    });
  }

  applyMonsterPosition() {
    if (!this.monsterContainer) {
      return;
    }
    this.monsterContainer.style.transform = `translate(${Math.round(
      this.monsterPosition.x
    )}px, ${Math.round(this.monsterPosition.y)}px)`;
  }

  applyBrookePosition() {
    if (!this.brookeContainer) {
      return;
    }
    this.brookeContainer.style.transform = `translate(${Math.round(
      this.brookePosition.x
    )}px, ${Math.round(this.brookePosition.y)}px)`;
  }

  getMonsterAnchors() {
    if (!this.monsterContainer) {
      return null;
    }
    const parseAnchor = (value) => {
      if (!value) {
        return null;
      }
      const [x, y] = value.split(",").map((entry) => Number(entry.trim()));
      if (Number.isNaN(x) || Number.isNaN(y)) {
        return null;
      }
      return { x, y };
    };

    const left = parseAnchor(this.monsterContainer.dataset.eyeLeft);
    const right = parseAnchor(this.monsterContainer.dataset.eyeRight);

    if (!left || !right) {
      return null;
    }

    return { left, right };
  }

  getViewportSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 900,
  height: 540,
  backgroundColor: BACKGROUND_COLOR,
  antialias: false,
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
