import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restartGame, selectAnswerCount, selectCurrentLogo, selectGuessCount } from './GuessingGameSlice';
import styles from './GuessingGame.module.css';
import { GuessingGameLogo } from './GuessingGameLogo';
import ShareIcon from '@material-ui/icons/Share';

const WebShareButton = ({ shareMessage }) => {
    const handleClick = () => {
        navigator.share({
            url: window.location.href,
            title: document.title,
            text: shareMessage
        })
        .then(() => console.log('Share was successful.'))
        .catch((error) => {
            alert('Sharing failed');
            console.log('Sharing failed', error)
        });
    }
    return (<Button variant="contained" onClick={handleClick} color="primary" startIcon={<ShareIcon />}>Share</Button>);
};

const ResultShare = ({ answerCount, guessCount }) => {
    const [isWebShareEnabled, setIsWebShareEnabled] = useState(false);
    const shareMessage = `You know there are too many JS libraries when there is a game for it 🎯 \n I got ${answerCount}/${guessCount}. Try it out!`;

    useEffect(() => {
        if (navigator.share) {
            setIsWebShareEnabled(true);
        } else {
            setIsWebShareEnabled(false);
        }
    }, []);
    return (<div className={styles.shareContainer}>
        {isWebShareEnabled && <WebShareButton shareMessage={shareMessage} />}
        {!isWebShareEnabled && <Button variant="contained" href={`https://twitter.com/intent/tweet?text=${shareMessage+' '+ window.location.href}`} target="_blank" color="primary" startIcon={<ShareIcon />}>Twitter</Button>}
        {!isWebShareEnabled && <Button variant="contained" href={`whatsapp://send?text=${shareMessage+' '+ window.location.href}`} target="_blank" color="primary" startIcon={<ShareIcon />}>WhatsApp</Button>}
    </div>);
}

const LearningSuggestion = () => {
    const currentLogo = useSelector(selectCurrentLogo);
    return (<div className={styles.learningSuggestion}>
        <a href={currentLogo.url}>
            <GuessingGameLogo />
        </a>
        <p>
            I am <a href={currentLogo.url} target="_blank" rel="noopener noreferrer"><strong>{currentLogo.name}!</strong></a> Click me to learn more.
        </p>
    </div>);
}

export const GuessingGameResults = () => {
    const answerCount = useSelector(selectAnswerCount);
    const guessCount = useSelector(selectGuessCount);
    const dispatch = useDispatch();
    const [insult, setInsult] = useState('');
    useEffect(() => {
        const insults = [
            'Why don\'t you go back to your desk and tail call yourself?',
            'I never believed in chaos theory until I saw your variable naming convention!',
            'Your commit is writing checks your merge can\'t cash.',
            'Your code, just like C. Has no class!',
            'Your coding methods are so backwards they\'ve added it to the school curriculum in Texas!',
            'Your code runs so slow your data brings sleeping bags to camp-out in the cache lines.',
            'More unit tests? No! What your code needs is petrol and a match.',
            'Imagine an egg hitting a concrete pavement, that\'s how hard-wired, inflexible and brittle your code is.',
            'Don\'t worry about it, I\'ll get someone technical to do this.',
            'You\'re slower than a Java app.',
            'You are one tab level off.',
            'Your code looks as though you have been playing bingo with anti-patterns.',
            'Your code is so wretched, that hard disks add it to their bad block lists.',
            'Clean, clear, and under control; three things that will never be said about your code.',
            'By popular demand, your code backup is in /dev/null/.',
            'Your webpages only render in IE 5.5.',
            '*Knock, knock* "Who\'s there?" *long pause* Your init method.',
            'There may be no I in TEAM, but I can\'t spell B GS, without U.',
            'If Perl scripts could carry coffee around, I could replace you with a one-liner.'
        ];
        const progress = (answerCount / guessCount) * 100 || 0
        if (progress < 1) {
            setInsult('Do you even JavaScript, bro?');
        } else if (progress >= 100) {
            setInsult('You did it! Now you can go back to your desk and start working.');
        } else {
            // 1 - 99
            setInsult(insults[Math.floor(Math.random() * insults.length)]);
        }
    }, [answerCount, guessCount]);
    return (<div className={styles.resultContainer}>
        <h1>{insult}</h1>
        <h2>{answerCount} / {guessCount}</h2>
        <Button variant="contained" color="primary" onClick={() => dispatch(restartGame())}>Restart</Button>
        <ResultShare answerCount={answerCount} guessCount={guessCount} />
        {answerCount !== guessCount && <LearningSuggestion />}
    </div>)
}