#!/usr/bin/env python3
"""Regenerate src/games/typing/engine/english-10k.json from wordfreq.

    python3 -m venv .venv-words
    .venv-words/bin/pip install wordfreq
    .venv-words/bin/python dev/generate-typing-words.py

WHY wordfreq: its data files are redistributable under CC BY-SA 4.0, unlike the
popular google-10000-english list (educational/personal use only, derived from the
LDC-licensed Google Web corpus) or Monkeytype's GPL-3.0 lists.

WHY the attribution lives INSIDE the JSON: wordfreq's author notes that bare exports
lose their attribution. Keeping the credits and license in the data file means the
list cannot travel without them.

The filter only removes entries. It never adds or reorders words, so the file stays
"the most frequent English words", minus things a player should not have to type.
"""

import json
import re
import sys
from importlib.metadata import version
from pathlib import Path

from wordfreq import top_n_list

TARGET = 10_000
# Single letters are frequent tokens but not words anyone practises, except these two.
SINGLE_LETTER_WORDS = {"a", "i"}
# Profanity, slurs and explicit terms. A blocklist only removes words from the ranked
# list; keep it to terms nobody should be asked to type in a casual game.
BLOCKED = {
    "anal", "arse", "ass", "asshole", "assholes", "bastard", "bitch", "bitches", "blowjob",
    "boob", "boobs", "bullshit", "chink", "clit", "cock", "cocks", "crap", "cum", "cunt",
    "damn", "dick", "dicks", "dildo", "dyke", "fag", "faggot", "fags", "fap", "fuck",
    "fucked", "fucker", "fuckers", "fuckin", "fucking", "fucks", "gook", "hoe", "hoes",
    "homo", "horny", "jizz", "kike", "milf", "motherfucker", "nigga", "niggas", "nigger",
    "niggers", "nsfw", "nude", "nudes", "orgasm", "penis", "piss", "pissed", "porn",
    "porno", "pornography", "prick", "pussy", "rape", "raped", "rapist", "retard",
    "retarded", "sex", "sexy", "shit", "shits", "shitty", "slut", "sluts", "spic",
    "stfu", "thot", "tits", "titties", "tranny", "twat", "vagina", "wank", "whore",
    "whores", "wtf", "xxx",
}

ATTRIBUTION = [
    "Word frequencies from wordfreq by Robyn Speer (https://github.com/rspeer/wordfreq), "
    "data redistributed under CC BY-SA 4.0.",
    "wordfreq includes data from Google Books Ngrams (http://books.google.com/ngrams).",
    "Derived from the Leeds Internet Corpus (University of Leeds Centre for Translation "
    "Studies), Wikipedia, and ParaCrawl.",
    "Contains data from OPUS OpenSubtitles 2018, originating from the OpenSubtitles "
    "project (http://www.opensubtitles.org/).",
    "Contains data from the SUBTLEX word lists by Marc Brysbaert et al. "
    "(http://crr.ugent.be/programs-data/subtitle-frequencies); SUBTLEX is freely "
    "available data.",
    "Filtered for Mini Games: plain lowercase words only, single letters other than "
    "'a' and 'i' removed, and a small profanity blocklist removed.",
]


def main() -> None:
    words: list[str] = []
    seen: set[str] = set()
    for word in top_n_list("en", 40_000):
        if not re.fullmatch(r"[a-z]+", word):
            continue
        if len(word) == 1 and word not in SINGLE_LETTER_WORDS:
            continue
        if word in BLOCKED or word in seen:
            continue
        seen.add(word)
        words.append(word)
        if len(words) == TARGET:
            break
    if len(words) != TARGET:
        sys.exit(f"only {len(words)} words passed the filter; raise the top_n_list size")

    data = {
        "name": "English top 10,000",
        "description": "The 10,000 most frequent plain English words, most frequent first.",
        "source": "https://github.com/rspeer/wordfreq",
        "wordfreqVersion": version("wordfreq"),
        "license": "CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)",
        "attribution": ATTRIBUTION,
        "words": words,
    }
    out = Path(__file__).resolve().parent.parent / "src" / "games" / "typing" / "engine" / "english-10k.json"
    out.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {len(words)} words to {out}")


if __name__ == "__main__":
    main()
