import React, { useEffect, useState } from "react";
import ReactFlow from 'react-flow-renderer';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import cover from "../assets/cover.jpg";
import liquidCheese from "../assets/liquid-cheese.svg";
import student from "../assets/student-removebg.png"
import sisu from "../assets/sisu.png"
import note1 from "../assets/note1.svg"
import note2 from "../assets/note2.svg"
import study from "../assets/study.svg"
import chat from "../assets/chat.svg"
import ServiceCard from './ServiceCard'
// import happy from "../assets/happy.svg";
// import certificate from "..assets/certificate.svg"
// import certification from "..assets/certification.svg"
// import devFocus from "..assets/dev_focus.svg"
// import done from "..assets/done.svg"
// import happyAnnouncement from "..assets/happy_announcement.svg"
// import multitasking from "..assets/undraw_multitasking_hqg3.svg"
// import notebook from "..assets/undraw_notebook_re_id0r.svg"
// import orderConfirmed from "..assets/order_confirmed.svg"
// import winners from "..assets/winners.png"
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    allInstructorCoursesAction,
    allUserCoursesAction,
    backendCourseListAction,
    databaseCourseListAction,
    designingCourseListAction,
    frontendCourseListAction,
    fullstackCourseListAction,
    otherCourseListAction,
} from "../actions/courseActions";
import { isUserEnrolledReset } from "../actions/userActions";
import Carousel from 'react-material-ui-carousel';
const useStyles = makeStyles((theme) => ({
    heroContent: {
        // backgroundColor: "#FEFFFF",
        padding: theme.spacing(10, 0, 4),
        backgroundColor: "#ffaa00",
        backgroundImage: `url(${liquidCheese})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
    },
    header: {
        height: "85vh",
        backgroundSize: "cover",
        backgroundPosition: "65% 50%",
        // backgroundImage: `url(${cover})`,
        // backgroundSize: "cover",
        // backgroundPosition: "65% 50%",
        // backgroundImage: `url(${liquidCheese})`,
        // backgroundColor: "#ffaa00"
    },
    heroDesign: {
        // border: "2px solid red",
        backgroundColor: "#af0d24",
        width: "150px",
        height: "150px",
        // marginTop: "-10%",
        // position: "absolute",
        "&:before": {
            content: "''",
            display: "block",
            width: "170px",
            height: "150px",
            // backgroundColor: "black",
            background: `linear-gradient(90deg, white 5px, transparent 1%) center, 
                    linear-gradient(white 5px, transparent 1%) center, grey`,
            backgroundSize: "6px 6px",
            marginTop: "20px",
            position: "absolute",
            zIndex: "-1"
        },
    },
    heroTextContainer: {
        // margin: "0 10% 0 10%",
        color: "black",
        padding: "0 10% !important",
        position: "relative",
        zIndex: "1",
    },
    heroText: {
        // borderLeft: "3px solid #dfdfdf",
        padding: theme.spacing(6),
        // "& h3": {
        //   color: "grey",
        //   textTransform: "lowercase",
        //   fontWeight: "bold",
        //   // letterSpacing: "1px",
        // },
    },
    heroImageItem: {
        display: "grid",
        placeItems: "center",
    },
    heroImageDiv: {
        width: "30vw",
        height: "30vw",
        border: "2px solid black",
        borderRadius: "50%",
        overflow: "hidden",
        zIndex: 1
    },
    heroImage: {
        width: "60vw",
        marginLeft: "-30vw",
        marginTop: "10%",
    },
    heroText: {
        // margin: "0 10% 0 10%",
        color: "black",
    },
    halfCircle: {
        height: "75vh",
        width: "75vh",
        border: "2px solid black",
        borderRadius: "50%",
        position: "absolute",
        marginLeft: "calc(100vw - 37.5vh)",
        marginTop: "5vh",
    },
    cardGrid: {
        backgroundColor: "#FEFFFF",
        // paddingBottom: theme.spacing(8),
        padding: theme.spacing(8, 16),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4),
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
        alignItems: "center",
    },
    heading: {
        width: "100%",
        fontSize: 30,
        fontWeight: "500",
        // textDecoration: "underline",
    },
    card: {
        backgroundColor: "white",
        height: "100%",
        boxShadow: "5px 5px 5px 5px lightgrey",
        display: "flex",
        flexDirection: "column",
        padding: "4%",
        "&:hover": {
            boxShadow: "0 3px 12px darkgrey",
        },
    },
    cardMedia: {
        margin: "2%",
        paddingTop: "56.25%",
        borderRadius: "0.25rem",
    },
    cardContent: {
        flexGrow: 1,
        textAlign: "center",
    },
    carousel: {
        width: "100%",
    },
    carouselItemContainer: {
        display: "flex",
        gap: "5%",
        paddingTop: "1rem",
    },
    carouselItem: {
        backgroundColor: "white",
        height: "100%",
        boxShadow: "0 3px 10px lightgrey",
        display: "flex",
        flexDirection: "column",
        padding: "4%",
        "&:hover": {
            boxShadow: "0 3px 12px darkgrey",
        },
        width: "250px"
    }
}));

function Home({ history }) {
    const classes = useStyles();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const frontendCourses = useSelector((state) => state.frontendCourses);
    const { frontendCourseList } = frontendCourses;
    const backendCourses = useSelector((state) => state.backendCourses);
    const { backendCourseList } = backendCourses;
    const designingCourses = useSelector((state) => state.designingCourses);
    const { designingCourseList } = designingCourses;
    const databaseCourses = useSelector((state) => state.databaseCourses);
    const { databaseCourseList } = databaseCourses;
    const fullstackCourses = useSelector((state) => state.fullstackCourses);
    const { fullstackCourseList } = fullstackCourses;
    const otherCourses = useSelector((state) => state.otherCourses);
    const { otherCourseList } = otherCourses;

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) dispatch(allUserCoursesAction(userInfo.data._id));
        dispatch(isUserEnrolledReset());
        if (userInfo) dispatch(allInstructorCoursesAction(userInfo.data._id));
        dispatch(frontendCourseListAction());
        dispatch(backendCourseListAction());
        dispatch(designingCourseListAction());
        dispatch(databaseCourseListAction());
        dispatch(fullstackCourseListAction());
        dispatch(otherCourseListAction());
    }, [dispatch, history]);

    let courses = [
        { title: "फ्रंटएंड पाठ्यक्रम", data: frontendCourseList },
        { title: "बैकएंड पाठ्यक्रम", data: backendCourseList },
        { title: "डिजाइनिंग सीखें", data: designingCourseList },
        { title: "डेटाबेस के बारे में जानें", data: databaseCourseList },
        { title: "फुलस्टैक पाठ्यक्रम", data: fullstackCourseList },
        { title: "अन्य पाठ्यक्रमों", data: otherCourseList },
    ];
    const [size, setSize] = useState(window.innerWidth >= 768 ? 4 : window.innerWidth >= 576 ? 2 : 1)

    const resizeWindow = () => {
        setSize(window.innerWidth >= 768 ? 4 : window.innerWidth >= 576 ? 2 : 1)
    }

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, [])


    function carouselItems(data) {
        console.log(size)
        let items = [];
        for (let i = 0; i < data.length; i += size) {
            let item =
                // <Grid item key={i} xs={12} sm={6} md={3}>
                <Container className={classes.carouselItemContainer}>
                    {
                        data.slice(i, Math.min(i + size + 1, data.length)).map((particularCourse, index) =>
                            <Link
                                to={`/course/${particularCourse._id}`}
                                style={{ textDecoration: "none" }}
                                key={index}
                            >
                                <Card className={classes.carouselItem}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={particularCourse.image}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h" component="h3">
                                            {/* Heading */}
                                            {particularCourse.name}
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle2">
                                            {particularCourse.description}
                                            {/* This is a media card. You can use this section to
                            describe the content. */}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            <Link to={`/course/${particularCourse._id}`}
                                                style={{ textDecoration: "none", color: "blue" }}>
                                                अधिक जानकारी {'>'}
                                            </Link>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    }
                </Container>
            // </Grid>
            items.push(item)
        }
        return items;
    }

    const elements = [
        {
            id: '1',
            type: 'input', // input node
            data: { label: 'Input Node' },
            position: { x: 250, y: 25 },
        },
        // default node
        {
            id: '2',
            // you can also pass a React component as a label
            data: { label: <img src={cover} width="100" height="200" /> },
            position: { x: 100, y: 125 },
        },
        {
            id: '3',
            type: 'output', // output node
            data: { label: 'Output Node' },
            position: { x: 250, y: 250 },
        },
        // animated edge
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
    ];
    return (
        <React.Fragment>
            <CssBaseline />
            <Header />
            <main>

                <div className={classes.heroContent}>
                    <Container maxWidth="xl">
                        <Grid container alignItems="center" className={classes.header}>
                            <Grid xs={12} md={6} lg={4} item className={classes.heroText} style={{ marginLeft: "50px", marginRight: "30px" }}>
                                <Typography variant="h3" gutterBottom style={{ fontStyle: "bold" }}>
                                    अपने करियर के अवसरों का विस्तार करें
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    जानें कि वेबसाइट और ऐप्स कैसे बनाएं एक कोड लिखें या एक व्यवसाय शुरू करें

                                </Typography>
                                <br />
                                {!userInfo ? (
                                    <Link
                                        to={"/signup"}
                                        style={{ textDecoration: "none", color: "white" }}
                                    >
                                        <Button style={{ width: "250px", borderRadius: "999px" }} variant="contained" color="primary">
                                            हमसे जुड़ें
                                        </Button>
                                    </Link>
                                ) : ("")}

                            </Grid>
                            {/* <ReactFlow elements={elements} /> */}
                            <Grid xs={12} md={6} lg={6} item className={classes.heroText} style={{ marginLeft: "50px" }}>
                                <img src={student} alt='img' width="80%" />
                                {/* <Typography variant="h4" gutterBottom>
                  Learn HTML , CSS , Web Apps & More
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Learn How To Build Websites & Apps Write A Code Or Start A
                  Business

                </Typography> */}
                            </Grid>

                        </Grid>

                    </Container>
                </div>
                {/* services */}
                {/* Services */}
                <Container className={classes.cardGrid}>
                    <h1 style={{ textAlign: "center", fontSize: "50px", fontWeight: "bold" }}>हमारी सेवाएँ</h1>
                    <Grid container spacing={10}>
                        <ServiceCard
                            title="प्रशिक्षण"
                            img={study}
                            clr="black"
                            link="courses"
                        />
                        <ServiceCard
                            title="टिप्पणियाँ"
                            img={note1}
                            clr="#f216fa"
                            link="notes"
                        />
                        <ServiceCard
                            title="वास्तविक समय चैटिंग"
                            img={chat}
                            clr="#f216fa"
                            link="chat"
                        />
                        {/* <ServiceCard
                            title="Trainings"
                            img="https://cdn.dribbble.com/users/2514124/screenshots/5439070/girl_3.gif"
                            clr="#f216fa"
                        /> */}
                    </Grid>
                </Container>
                {/* Extra things */}
                <Container className={classes.cardGrid}>
                    <h1 style={{ textAlign: "center", fontSize: "50px", fontWeight: "bold" }}>फ़ायदे</h1>
                    <br />
                    <Grid container spacing={6}>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    // image={feature1}
                                    // image="https://jana-sa.com/image/about-us/e762bf4b8cbc5ee9e70e7e087f99e5c3.gif"
                                    image="https://cdn.dribbble.com/users/2514124/screenshots/5439070/girl_3.gif"
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h" component="h2">
                                        लाइफ टाइम एक्सेस
                                    </Typography>
                                    लोरेम इप्सम केवल छपाई का डमी पाठ है और
                                    टाइपसेटिंग उद्योग। लोरेम इप्सम उद्योग का रहा है
                                    1500 के दशक के बाद से मानक डमी पाठ, जब एक अज्ञात
                                    प्रिंटर ने एक गैली टाइप की ली और उसे टाइप करने के लिए हाथापाई की
                                    नमूना पुस्तक। यह न केवल पांच शताब्दियों तक जीवित रहा है, बल्कि
                                    इलेक्ट्रॉनिक टाइपसेटिंग में भी छलांग, शेष
                                    अनिवार्य रूप से अपरिवर्तित।
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    // image={feature2}
                                    image="https://i.pinimg.com/originals/16/9c/11/169c11293f5c08a325ee1bbc8a0d4cb8.gif"
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h" component="h2">
                                        कम लागत
                                    </Typography>
                                    यह एक लंबे समय से स्थापित तथ्य है कि एक पाठक विचलित हो जाएगा
                                    किसी पृष्ठ के लेआउट को देखते समय उसकी पठनीय सामग्री द्वारा।
                                    लोरेम इप्सम का उपयोग करने की बात यह है कि इसमें कम या ज्यादा है
                                    'सामग्री' का उपयोग करने के विरोध में अक्षरों का सामान्य वितरण
                                    यहाँ, सामग्री यहाँ', जिससे यह पठनीय अंग्रेजी जैसा दिखता है।
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    // image={feature3}
                                    // image="https://mintbook.com/assetsNew/img/university.gif"
                                    image="https://www.excelsisdeo.com/images/AlphaTestersAnimation_60.gif"
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h" component="h2">
                                        अपनी उंगलियों पर सीखना
                                    </Typography>
                                    लोरेम इप्सम के मार्ग के कई रूप हैं
                                    उपलब्ध है, लेकिन अधिकांश को कुछ में परिवर्तन का सामना करना पड़ा है
                                    रूप, इंजेक्शन हास्य, या यादृच्छिक शब्द जो नहीं दिखते
                                    थोड़ा विश्वसनीय भी। यदि आप के मार्ग का उपयोग करने जा रहे हैं
                                    लोरेम इप्सम, आपको यह सुनिश्चित करने की आवश्यकता है कि कुछ भी नहीं है
                                    पाठ के बीच में छिपा हुआ शर्मनाक।
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                {/* Fetching courses */}
                <Container className={classes.cardGrid} maxWidth="xl">
                    {courses.map((course) => (
                        <div>
                            <br />
                            <Typography className={classes.heading} gutterBottom>
                                {course.title}
                            </Typography>
                            <br />
                            {/* <Grid container spacing={8}> */}
                            <Carousel autoPlay={false} animation="slide" className={classes.carousel} >
                                {carouselItems(course.data)}
                            </Carousel>
                            {/* </Grid> */}
                            <br />
                        </div>
                    ))}
                </Container>
                {/* <Container className={classes.cardGrid} maxWidth="xl">
          {courses.map((course) => (
            <div>
              <br />
              <Typography className={classes.heading} gutterBottom>
                {course.title}
              </Typography>
              <br />
              <Grid container spacing={8}>
                {course.data.map((particularCourse, index) => (
                  <Grid item key={index} xs={12} sm={6} md={3}>
                    <Link
                      to={`/course/${particularCourse._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={particularCourse.image}
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h" component="h2">
                          //  Heading 
                            {particularCourse.name}
                          </Typography>
                          <Typography>
                            {particularCourse.description}
                         //  This is a media card. You can use this section to
                         //   describe the content. 
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <br />
            </div>
          ))}
        </Container> */}
            </main>
            {/* <Footer /> */}
        </React.Fragment>
    );
}

export default Home;