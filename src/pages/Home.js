import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

function Home(props) {
    return (
        <div>
            <Container className="offWhite py-5 text-marai content-container" style={{ backgroundColor: '#f8f9fa' }}>
                <Row className="mb-5 text-center">
                    <Col>
                        <h1 className="mb-3">مترجم خطبة يوم الجمعة</h1>
                        <p className="lead">
                            موقع يترجم خطبة يوم الجمعة بدقة عالية باستخدام الذكاء الاصطناعي، مع الترجمة الدقيقة للآيات القرآنية من مصادر موثوقة.
                        </p>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={6}>
                        <Card className="shadow-sm h-100" dir='rtl'>
                            <Card.Body>
                                <Card.Title>كيف يعمل الموقع؟</Card.Title>
                                <Card.Text>
                                    <ul dir="rtl">
                                        <li>التقاط صورة من الخطبة باستخدام كاميرا الخطيب.</li>
                                        <li>تحويل الصورة إلى نص باستخدام تقنية OCR.</li>
                                        <li>تنقيح النص والتعرف على الآيات القرآنية بدقة.</li>
                                        <li>البحث عن ترجمة معتمدة للآيات من موسوعة القرآن الكريم.</li>
                                        <li>استبدال الآيات بالترجمة المعتمدة.</li>
                                        <li>ترجمة باقي النص باستخدام الذكاء الاصطناعي.</li>
                                    </ul>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm h-100" dir='rtl'>
                            <Card.Body>
                                <Card.Title>مميزات الخدمة</Card.Title>
                                <Card.Text>
                                    <ul dir="rtl">
                                        <li>دقة 100% في ترجمة الآيات القرآنية.</li>
                                        <li>تصحيح إملائي تلقائي للنصوص.</li>
                                        <li>تكلفة منخفضة: فقط 35 ريال لكل خطبة.</li>
                                        <li>زمن التنفيذ: أقل من دقيقتين (120 ثانية).</li>
                                    </ul>
                                </Card.Text>
                                <div className="text-center mt-3">
                                    <Link to="/translate">
                                        <Button variant="success">ابدأ الآن</Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* New Informational Section */}
            <Container className="offWhite py-5 text-marai content-container mb-5" style={{ backgroundColor: '#f8f9fa' }}>
                <Row className="mb-4 text-center" dir="rtl">
                    <Col>
                        <h1 className="mb-3">للمساجد الراغبة في الخدمة</h1>
                        <p className="lead m-3">
                            تم بناء هذا المشروع على يد مبرمج سعودي واحد،
                            المشروع خيري بالكامل وغير مخصص للبيع أو الربح. تمت الاستفادة من أحدث تقنيات الذكاء الاصطناعي في الترجمة واستخراج النصوص بدقة واحترافية.
                        </p>
                        <p className='m-2'>
                            في حال الرغبة في ترجمة خطبة يوم الجمعة في مسجدكم, يجب توفر شاشات على الاقل في المسجد لعرض الترجمات
                        </p>
                        <p className='m-2'>
                            يجب التواصل على تويتر او لنكد إن للتنسيق
                        </p>
                        <div className="d-flex justify-content-center gap-4 mt-4">
                            <a
                                href="https://twitter.com/your_account"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link twitter text-decoration-none"
                            >
                                <FaTwitter size={28} /> <span className="ms-2"></span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/your_account"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link linkedin text-decoration-none"
                            >
                                <FaLinkedin size={28} /> <span className="ms-2"></span>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
