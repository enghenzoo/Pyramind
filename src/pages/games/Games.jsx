body{
    background: var(--Very-Dark-Blue);
}

.navbar {
    background-color: rgba(20, 0, 50, 0.6) !important;
    border-bottom: 1px solid var(--Deep-Pink);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    color: var(--Cyan) !important;
    text-shadow: 0 0 10px var(--Cyan);
    position: sticky;
    top: 0;
    z-index: 999;
}

.nav-link {
    color: var(--Cyan) !important;
    text-shadow: 0 0 10px var(--Cyan);
    transition: color 0.3s ease, text-shadow 0.3s ease;
}

.navbar-brand {
    font-size: 1.4rem;
    color: var(--White) !important;
    text-shadow:
        0 0 8px var(--Deep-Pink),
        0 0 16px var(--Deep-Pink),
        0 0 24px var(--Deep-Pink),
        0 0 32px var(--Deep-Pink);
}

.navbar-brand img {
    vertical-align: middle;
}

.Logo {
    width: 50px;
    height: auto;
}

.Logo:hover {
    transform: scale(1.1);
}

.brand-text {
    font-size: 1.5rem;
    color: var(--Cyan);
    letter-spacing: 2px;
    transition: color 0.3s ease;
}

.btn-outline-pink {
    border: 2px solid var(--Deep-Pink);
    color: var(--Deep-Pink);
    font-weight: 600;
    transition: 0.3s;
}

.btn-outline-pink:hover {
    background: var(--Deep-Pink);
    color: var(--White);
    box-shadow: 0 0 20px var(--Deep-Pink);
}

/* Sign Up */
.sign-up-btn {
    color: var(--Deep-Pink) !important;
    border: 2px solid var(--Deep-Pink);
    background-color: transparent;
    transition: 0.3s ease;
}

.sign-up-btn:hover {
    background-color: var(--Deep-Pink);
    color: var(--White) !important;
    box-shadow: 0 0 10px var(--Deep-Pink);
}

/* Neon Animation */
@keyframes glowPulse {
    0% {
        text-shadow: 0 0 10px var(--Deep-Pink), 0 0 20px var(--Cyan);
    }

    50% {
        text-shadow: 0 0 30px var(--Deep-Pink), 0 0 50px var(--Cyan);
    }

    100% {
        text-shadow: 0 0 10px var(--Deep-Pink), 0 0 20px var(--Cyan);
    }
}
/* 

.site-header {
    background: rgba(13, 12, 28, 0.35);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    position: sticky;
    top: 0;
    z-index: 60;
}

.header-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    gap: 12px;
}

.logo {
    width: 48px;
    height: auto;
    margin-right: 10px;
    vertical-align: middle;
    background: transparent;
}

.brand-text {
    font-weight: 700;
    color: var(--cyan);
    letter-spacing: 2px;
    background: linear-gradient(90deg, var(--Cyan), var(--Deep-Pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: brandShift 6s linear infinite;
}

@keyframes brandShift {
    0% {
        background-position: 0%;
    }

    100% {
        background-position: 200%;
    }
}

.main-nav a {
    color: rgba(255, 255, 255, 0.85);
    margin-left: 18px;
    text-decoration: none;
    transition: color 0.22s ease;
}

.main-nav a:hover {
    color: var(--Cyan);
    text-shadow: 0 0 12px rgba(0, 224, 255, 0.12);
} */

/* HERO */
.hero {
    padding: 48px 20px;
    text-align: center;
}

.hero-inner {
    max-width: 980px;
    margin: 0 auto;
}

/* ---- HERO TITLE: neon glow + sweeping light ---- */
.hero-title {
    font-size: 28px;
    line-height: 1.15;
    margin-bottom: 12px;
    color: var(--Deep-Pink);
    position: relative;
    display: inline-block;
    /* required for sweep pseudo-element */
    padding: 6px 10px;
    z-index: 1;
}


/* sweeping highlight (thin glossy streak moving left->right) */
.hero-title::before {
    content: "";
    position: absolute;
    top: -10%;
    left: -40%;
    width: 40%;
    height: 120%;
    background: linear-gradient(90deg,
            transparent,
            rgba(255, 255, 255, 0.22),
            transparent);
    transform: skewX(-18deg);
    filter: blur(6px);
    opacity: 0.7;
    pointer-events: none;
    z-index: -1;
    animation: sweep 4s linear infinite;
    mix-blend-mode: screen;
}

@keyframes sweep {
    0% {
        left: -60%;
        opacity: 0;
    }

    15% {
        opacity: 0.25;
    }

    50% {
        left: 110%;
        opacity: 0.35;
    }

    85% {
        opacity: 0.18;
    }

    100% {
        left: 130%;
        opacity: 0;
    }
}

/* subtitle under the title (smaller neon glow) */
.hero-sub {
    color: var(--Cyan);
    margin-bottom: 18px;
    font-size: 15px;
}

/* CTA button */
.cta {
    padding: 10px 18px;
    background: linear-gradient(90deg, var(--Cyan), var(--Deep-Pink));
    border: none;
    color: var(--Dark-Gray);
    font-weight: 700;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 8px 30px rgba(255, 0, 204, 0.06);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.cta:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 18px 50px rgba(0, 224, 255, 0.1);
}

/* Layout - content */
.content {
    max-width: 1200px;
    margin: 28px auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 24px;
    align-items: start;
}

/* Cards and grid */
.levels-grid {
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.01),
            rgba(255, 255, 255, 0.02));
    padding: 18px;
    border-radius: 14px;
}

.game-card {
    display: flex;
    gap: 18px;
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0.01));
    padding: 14px;
    border-radius: 12px;
    align-items: center;
    transition: transform 0.32s ease, box-shadow 0.32s ease;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.02);
    margin-bottom: 16px;
}

.game-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.7);
}

/* square image */
.game-image {
    width: 46%;
    aspect-ratio: 1/1;
    min-height: 160px;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    border: 2px solid rgba(255, 255, 255, 0.03);
    transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
        box-shadow 0.45s ease;
}

.game-card:hover .game-image {
    transform: translateY(-6px) scale(1.04);
    box-shadow: 0 12px 30px rgba(0, 224, 255, 0.06),
        0 0 28px rgba(255, 0, 204, 0.06);
}

/* fallback if aspect-ratio not supported */
@supports not (aspect-ratio: 1/1) {
    .game-image {
        height: 46vw;
        max-height: 320px;
    }
}

.game-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
}

.game-title {
    color: var(--Cyan);
    margin: 0 0 6px 0;
    font-size: 18px;
    letter-spacing: 0.6px;
}

.muted {
    color: rgba(255, 255, 255, 0.75);
    font-size: 14px;
}

/* dots / progress */
.meta-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    letter-spacing: 1px;
}

.dots {
    margin-left: auto;
    display: flex;
    gap: 8px;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
}

.dot.active {
    background: linear-gradient(90deg, var(--Dark-Gray), var(--Cyan));
    box-shadow: 0 0 12px rgba(0, 224, 255, 0.12);
}

.progress-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.progress {
    flex: 1;
    height: 10px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 999px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--Cyan), var(--Deep-Pink));
    box-shadow: 0 6px 20px rgba(0, 224, 255, 0.08);
}

/* mini-cards */
.lower-row {
    display: flex;
    gap: 12px;
    margin-top: 6px;
}

.mini-card {
    flex: 1;
    background: rgba(255, 255, 255, 0.02);
    padding: 10px;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
}

.mini-image {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    background: linear-gradient(90deg, var(--Cyan) 22, var(--Deep-Pink) 22);
}

/* Sidebar */
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: sticky;
    top: 20px;
}

.card {
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0.01));
    padding: 12px;
    border-radius: 10px;
}

.profile-top {
    display: flex;
    gap: 12px;
    align-items: center;
}

.avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    background: linear-gradient(90deg, var(--Deep-Pink), var(--Cyan));
    color: var(--dark);
}

.name {
    color: var(--Deep-Pink);
    font-weight: 700;
}

.stat-title {
    color: rgba(255, 255, 255, 0.7);
}

.stat-value {
    float: right;
    font-weight: 700;
    color: var(--Cyan);
}

/* footer */
.site-footer {
    margin-top: 30px;
    padding: 18px 20px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
}

/* play button */
.play-btn {
    padding: 8px 12px;
    background: linear-gradient(90deg, var(--Cyan), var(--Deep-Pink));
    border: none;
    color: var(--Dark-Gray);
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.25s;
}

.play-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(255, 0, 204, 0.12);
}

/* Responsive */
@media (max-width: 980px) {
    .content {
        grid-template-columns: 1fr;
    }

    .sidebar {
        position: relative;
        top: 0;
    }

    .game-image {
        width: 100%;
        aspect-ratio: 1/1;
        min-height: 220px;
    }

    .game-card {
        flex-direction: column;
        align-items: stretch;
    }

    .game-card .game-image {
        margin-bottom: 12px;
    }

    .lower-row {
        flex-direction: column;
    }
}

@media (max-width: 520px) {
    .hero-title {
        font-size: 20px;
    }

    .header-inner {
        padding: 12px;
    }

    .main-nav a {
        margin-left: 12px;
        font-size: 14px;
    }
}

/* header */
.hero {
    text-align: center;
    margin-bottom: 22px;
}

.title {
    font-size: 48px;
    letter-spacing: 4px;
    margin: 0;
    color: var(--Cyan);
    text-shadow: 0 0 18px rgba(0, 224, 255, 0.25),
        0 0 40px rgba(255, 0, 204, 0.12);
}

.subtitle {
    font-size: 1.2rem;
    color: #eee;
    text-align: center;
    margin-top: 10px;
    font-family: "Courier New", monospace;
}

/* layout */
.content {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 26px;
    align-items: start;
    max-width: 1200px;
    margin: 0 auto;
}

/* left column cards */
.levels-grid {
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0.01));
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.03);
}

/* big card */
.game-card {
    display: flex;
    gap: 18px;
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0.01));
    padding: 18px;
    border-radius: 12px;
    margin-bottom: 18px;
    position: relative;
    border: 2px solid transparent;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
}

.game-card::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 14px;
    pointer-events: none;
    background: linear-gradient(90deg,
            rgba(0, 224, 255, 0.12),
            rgba(255, 0, 204, 0.06));
    z-index: -1;
    filter: blur(8px);
    opacity: 0.9;
}

/* image */
.game-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    min-height: 160px;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    border: 3px solid rgba(0, 224, 255, 0.12);
    box-shadow: inset 0 -20px 40px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 10px;
    position: relative;
}

.image-lock {
    font-size: 22px;
    background: linear-gradient(90deg, var(--Deep-Pink), var(--Cyan));
    padding: 6px 8px;
    border-radius: 8px;
    color: var(--Dark-Gray);
    box-shadow: 0 4px 18px rgba(255, 0, 204, 0.15);
}

/* body */
.game-body {
    flex: 1;
    padding: 4px 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.game-body h3 {
    margin: 0;
    color: var(--Cyan);
    letter-spacing: 0.6px;
}

.muted {
    color: rgba(255, 255, 255, 0.65);
    font-size: 14px;
    margin-top: 8px;
}

/* meta/difficulty */
.meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 16px;
}

.label {
    color: var(--Dark-Gray);
    font-size: 12px;
    letter-spacing: 1px;
}

.dots {
    display: flex;
    gap: 6px;
    margin-left: auto;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6) inset;
}

.dot.active {
    background: linear-gradient(90deg, var(--Deep-Pink), var(--Cyan));
    box-shadow: 0 0 14px rgba(0, 224, 255, 0.22), 0 0 24px rgba(255, 0, 204, 0.12);
}

/* progress */
.progress-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
}

.progress {
    flex: 1;
    height: 10px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 999px;
    overflow: hidden;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
}

.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--Cyan), var(--Deep-Pink));
    border-radius: 999px;
    box-shadow: 0 4px 18px rgba(0, 224, 255, 0.18);
}

/* lower small cards */
.lower-row {
    display: flex;
    gap: 18px;
    margin-top: 10px;
}

.mini-card {
    flex: 1;
    padding: 12px;
    border-radius: 12px;
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.01),
            rgba(255, 255, 255, 0.02));
    border: 1px solid rgba(255, 255, 255, 0.03);
}

.mini-image {
    height: 86px;
    border-radius: 8px;
    background: linear-gradient(135deg,
            rgba(0, 224, 255, 0.06),
            rgba(255, 0, 204, 0.04));
    margin-bottom: 10px;
    border: 2px solid rgba(255, 255, 255, 0.02);
}

/* neon borders helper classes */
.neon-border-cyan {
    box-shadow: 0 6px 30px rgba(0, 224, 255, 0.06);
    border-radius: 12px;
    border: 1px solid rgba(0, 224, 255, 0.12);
    padding: 12px;
}

.neon-border-pink {
    box-shadow: 0 6px 30px rgba(255, 0, 204, 0.06);
    border-radius: 12px;
    border: 1px solid rgba(255, 0, 204, 0.12);
    padding: 12px;
}

/* sidebar */
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: sticky;
    top: 28px;
    height: fit-content;
}

.card {
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.02),
            rgba(255, 255, 255, 0.01));
    border-radius: 12px;
    padding: 14px;
}

/* profile */
.profile-top {
    display: flex;
    gap: 12px;
    align-items: center;
}

.avatar {
    width: 56px;
    height: 56px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    background: linear-gradient(90deg, var(--Deep-Pink), var(--Cyan));
    color: var(--Dark-Gray);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
}

.name {
    font-weight: 700;
    color: var(--Deep-Pink);
    font-size: 18px;
    letter-spacing: 1px;
}

.profile-stats {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--Dark-Gray);
}

.stat-title {
    font-size: 13px;
    color: var(--Dark-Gray);
}

.stat-value {
    float: right;
    font-weight: 700;
    color: var(--Cyan);
}

/* achievements */
.ach-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
}

.ach {
    height: 56px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.03);
    color: var(--White);
}

h4{
    color:var(--Deep-Pink) ;
}

.ach.placeholder {
    opacity: 0.35;
}

/* ranks */
.rank-list {
    margin: 0;
    padding: 0 6px;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.rank-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px;
    border-radius: 8px;
    color: var(--Dark-Gray);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.01), transparent);
}

.rank {
    font-weight: 800;
    color: var(--Deep-Pink);
    margin-right: 8px;
}

.tiny {
    color: var(--Dark-Gray);
    margin-left: 12px;
    font-size: 12px;
}

/* footer */
.site-footer {
    margin-top: 26px;
    text-align: center;
    color:var(--White);
    font-size: 13px;
}

/* responsive */
@media (max-width: 980px) {
    .content {
        grid-template-columns: 1fr;
    }

    .sidebar {
        position: relative;
        top: 0;
    }
}
