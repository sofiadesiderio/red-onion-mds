import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        minHeight: '650px',
        margin: '10px 20px',
    },
});

export default function ImgMediaCard(props) {
    const { description, icon, image, title } = props.info;
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component='img'
                    alt={title}
                    height='340'
                    image={image}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        <img
                            src={icon}
                            alt='icon'
                            style={{ marginRight: '5px' }}
                        />{' '}
                        {title}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size='small' color='primary'>
                    Share
                </Button>
                <Button size='small' color='primary'>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

ImgMediaCard.propTypes = {
    info: PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};
