---
title: World Password Day 2022
layout: post
author: jon
date: 2022-05-03
tags: cyber-security password password-manager
display: none
---

## History of passwords

Since the Roman's people have used passwords to authenticate peaople. Back then it was to establish friend from foe.

But then the first use of a password was from the early 1960's at MIT. The computer was a shared resource with users allocated 4 hours a week. So a password was used to authenticate the users and also allowed them keep their own files private.

More recently I remember a time in the early days of the world wide web (1990s) when you just used the same simple password everywhere. I don't remember having that many sites or places to enter a password either. Maybe it was a little bit more complex and possibly even adapted over time.

## Passwords now

Acording to some research a few years ago the average person had around 100 passwords (or at least places that needed passwords). I guess most will be websites and/or applications. I know at last check I had over 300. Most sites in the early days probably didn't have much if any password requirements, now most sites do have stricter requirements.

## Why should we care about passwords?

Many people think they have nothing to loose, and nobody would be interested in 'hacking' them. But how many of us have seen family or friends saying they have had their social media or email accounts comprimised?

Criminals try and compromise emails and social media accounts of anyone they can. They can then use these to compromise others or try and get money from family and friends whilst they impersonate you.

## How could someone break into my account?

Some of the most common methods to compromise your account:

1. An attacker has access a list of passwords from a site and take your credentials and tries them on other sites. Perhaps even with some veriation.
2. An attacker takes a list of commonely used passwords and tries to log into your account by trying each of them.
3. An attaker tricks you into clicking a link that takes you to a fake site. Often pretending to be a major social media site or email. It then asks you to sign in and captures your credentials. This can be automated to even try and log in with your details and ask for any 2FA codes.

## How can I avoid getting hacked?

As one of the most common ways of account copmrimse is due to password reuse. Use a unique password for each site. Nobody is going to remember 100+ different passwords. And coming up with some way of doing it like tagging on the name of the site to the end of the password would make it easy to spot a pattern like that. Which leaves writting your password down. Something we have been told never to do. But that was back when the danger of someone halfway round the world was lower than some vistor to your office (or co-worker) seeing the postit note on your monitor with the one password you use eerywhere written on it.

To understand the scale of breaches there is a great visulisation. [World's Biggest Data Breaches & Hacks, selected events over 30,000 records](https://www.informationisbeautiful.net/visualizations/worlds-biggest-data-breaches-hacks/).

If you want to see how you might have been impcated then check out [have i been pwned](https://haveibeenpwned.com/).

### Password managers

A password manager allows you to store a different password for every site, so if one is comprimised the rest aren't. As you dont need to remember the paswords they can be as long and complex as you like, making them hard to crack or guess. It is also quicker and easier to login to sites and apps with a password maanger.
But now we are storing all our passwords in one place, what if the password manager is comprimised? Yes that would be a problem, but if we use the same password on each of the 100 sites and one site is comprimised then all of them are. And that istuation is more likely. Now you only need to remember one password for your password manager and so you can make it much harder to guess or crack and it won't be used anywhere else. Also, unlike most of those 100 sites, the password managers allow two-factor authentication and are focused on protecting themselves.

Another benefit of using a password manager is that if someone tricks you to visit a fake login page, your password manager won't autofill your credentials.

### Strong passwords

When you register on a site and set a password, generally that password is not just stored in the clear. Otherwise, anyone with access to the list could know everyone's passwords and use them. Given when you log in, the site needs to compare what you entered with the password it already has on file, that would mean the site has access to the list.

Instead a site whould create a hash of your password, which is a one way mathametical function which can not be reveresed. So to see if you the password provided matches the one stored, the password provided is hashed and compared against the stored hash. So if the list of users passwords on a site is stolen, the criminal has hashes rather than passwords. To work out the passwords they must 'crack' them by generating hashes to compare against the stolen ones until they get a match. Rather than taking time to generate hashes from scratch, most people will have a large list of already generated hashes called 'rainbow tables'. These list of hashes can be very large in size, GB or event TB, and generating hashes can take a lot of time.

I am over simplifying this, but in short, using a well known password or a simple one will be easier for it to be revealed. So whilst 1q2w3e4r5t6y is 12 characters long, has a mix of letters and numbers, it is on the list of well known previously used passwords and so would be trivial to identify. For more info [Troy Hunt has a good blog post.](https://www.troyhunt.com/we-didnt-encrypt-your-password-we-hashed-it-heres-what-that-means/)

Also, using a password that is easily cracked or used by others will mean it is on a list of known passwords and could be used by attackers trying to log in as you.

[Pwned Passwords](https://haveibeenpwned.com/Passwords) lets you see if your password is already known.

As demonstrated well in [this cartoon](https://xkcd.com/936 "XKCD comic password strength"), the password Tr0ub4dor&3 is easier for a computer to guess, than "correct horse battery staple". Also, a passphrase is easier to remember.

![Password Strength cartoon](https://imgs.xkcd.com/comics/password_strength.png "Password Strength")

So for passwords stored in your password manager make them as long as the site will allow and yes include as many upper and lower case letters as well as numbers and symbols.

For passwords you need to remember, like your password manager use a passphrase. The [EFF](https://www.eff.org/dice "EFF dice") has a wordlist and walks you through how you can use it and dice to generate a passphrase. Or easier still [https://www.useapassphrase.com/](https://www.useapassphrase.com/) helps to generate a passprhase.
