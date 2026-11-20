import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Select,
  Slider,
  Tag,
  Avatar,
  Row,
  Col,
  Typography,
  Empty
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  StarFilled,
  ArrowRightOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

import { useEffect } from "react";
import mentorApi from "../../apiManager/mentor";
import useMentorStore from "../../redux/mentors";

export default function MentorsPage() {
  const mentors = useMentorStore((state) => state.mentorsData);
  const setMentorsData = useMentorStore((state) => state.setMentorsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("All Expertise");
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedRating, setSelectedRating] = useState("Any Rating");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      const filters = {
        fullname: searchTerm,
        expertise: selectedExpertise === "All Expertise" ? "" : selectedExpertise,
        rating: selectedRating === "Any Rating" ? "" : selectedRating,
      };

      if (priceRange[0] !== 50 || priceRange[1] !== 200) {
        filters.priceRange = priceRange.join("-");
      }
      
      const response = await mentorApi.getAllMentors(filters);
      setMentorsData(response.data.mentors);
    };
    fetchMentors();
  }, [searchTerm, selectedExpertise, selectedRating, priceRange]);

  const expertiseOptions = [
    "Software Engineering",
    "Product Management",
    "UX Design",
    "Data Science",
    "Digital Marketing",
    "Engineering Leadership",
    "Career Transition",
    "Machine Learning",
    "Strategy",
    "Leadership"
  ];

  const filteredMentors = mentors;

  return (
    <div style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={2} style={{ marginBottom: 0 }}>
            Find Your Perfect Mentor
          </Title>
          <Text type="secondary">
            Connect with industry experts for personalized career guidance
          </Text>
        </Col>
        <Col>
          <Button type="default" icon={<MessageOutlined />}>
            Try AI Assistant
          </Button>
        </Col>
      </Row>

      {/* Search + Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={showFilters ? 24 : 18}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by name, expertise, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={24} md={6}>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setShowFilters(!showFilters)}
            block
          >
            Filters
          </Button>
        </Col>
      </Row>

      {/* Filter Panel */}
      {showFilters && (
        <Card size="small" style={{ marginBottom: 20 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={6}>
              <Text strong>Expertise</Text>
              <Select
                value={selectedExpertise}
                onChange={setSelectedExpertise}
                style={{ width: "100%" }}
              >
                <Option value="All Expertise">All Expertise</Option>
                {expertiseOptions.map((opt) => (
                  <Option key={opt} value={opt}>
                    {opt}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Text strong>
                Price Range: ${priceRange[0]} - ${priceRange[1]}/hour
              </Text>
              <Slider
                range
                min={50}
                max={300}
                step={10}
                value={priceRange}
                onChange={setPriceRange}
              />
            </Col>
            <Col xs={24} md={6}>
              <Text strong>Minimum Rating</Text>
              <Select
                value={selectedRating}
                onChange={setSelectedRating}
                style={{ width: "100%" }}
              >
                <Option value="Any Rating">Any Rating</Option>
                <Option value="4.5">4.5+ Stars</Option>
                <Option value="4.7">4.7+ Stars</Option>
                <Option value="4.8">4.8+ Stars</Option>
                <Option value="4.9">4.9+ Stars</Option>
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Button
                block
                onClick={() => {
                  setSearchTerm("");
                  setSelectedExpertise("All Expertise");
                  setPriceRange([50, 200]);
                  setSelectedRating("Any Rating");
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card>
      )}

      {/* Mentor Cards */}
      <Row gutter={[24, 24]}>
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => {
            const activeServices = mentor.services?.filter((service) => service.active) || [];
            const hourlyRate = mentor.hourlyRate ?? activeServices[0]?.price;
            const expertise = mentor.expertise?.filter(Boolean) || [];

            return (
            <Col xs={24} sm={12} xl={8} key={mentor._id}>
              <Card
                hoverable
                className="group h-full overflow-hidden !rounded-3xl !border-0 !shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:!shadow-[0_20px_50px_rgba(37,99,235,0.16)]"
                styles={{ body: { display: "flex", flexDirection: "column", height: "100%", padding: 0 } }}
              >
                      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800">
                        <div className="absolute -right-8 -top-16 h-48 w-48 rounded-full border-[24px] border-white/10" />
                        <div className="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-cyan-300/20 blur-2xl" />
                        {mentor.availability && (
                          <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                            {mentor.availability}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col px-6 pb-6">
                        <div className="-mt-12 mb-4 flex items-end justify-between">
                          <Avatar
                            size={88}
                            src={mentor.profilePicture || mentor.image}
                            className="!border-4 !border-white !bg-blue-100 !text-3xl !font-bold !text-blue-700 !shadow-lg"
                          >
                            {mentor.fullname?.[0]?.toUpperCase() || "M"}
                          </Avatar>
                          {Number(mentor.rating) > 0 && (
                            <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
                              <StarFilled className="text-amber-400" />
                              {Number(mentor.rating).toFixed(1)}
                              {Number(mentor.ratingCount) > 0 && (
                                <span className="font-normal text-amber-600">({mentor.ratingCount})</span>
                              )}
                            </span>
                          )}
                        </div>

                        <div className="mb-4">
                          <Text className="!text-xl !font-bold !text-slate-900">{mentor.fullname}</Text>
                          {(mentor.title || mentor.company) && (
                            <Text className="mt-1 block !text-sm !text-slate-500">
                              {[mentor.title, mentor.company].filter(Boolean).join(" · ")}
                            </Text>
                          )}
                        </div>

                        {mentor.bio && (
                          <Paragraph ellipsis={{ rows: 2 }} className="!mb-4 !min-h-11 !text-sm !leading-6 !text-slate-600">
                            {mentor.bio}
                          </Paragraph>
                        )}

                        {expertise.length > 0 && (
                          <div className="mb-4 flex min-h-7 flex-wrap gap-2">
                            {expertise.slice(0, 3).map((item) => (
                              <Tag key={item} className="!m-0 !rounded-full !border-blue-100 !bg-blue-50 !px-3 !py-1 !text-blue-700">
                                {item}
                              </Tag>
                            ))}
                          </div>
                        )}

                        {(mentor.location || mentor.responseTime || Number(mentor.sessions) > 0) && (
                          <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                            {mentor.location && <span className="inline-flex items-center gap-1.5"><EnvironmentOutlined />{mentor.location}</span>}
                            {mentor.responseTime && <span className="inline-flex items-center gap-1.5"><ClockCircleOutlined />Replies in {mentor.responseTime}</span>}
                            {Number(mentor.sessions) > 0 && <span>{mentor.sessions} sessions</span>}
                          </div>
                        )}

                        <div className="mt-auto border-t border-slate-100 pt-4">
                          <div className="mb-4 flex items-baseline justify-between">
                            <Text className="!text-xs !uppercase !tracking-wider !text-slate-400">Session rate</Text>
                            {hourlyRate !== null && hourlyRate !== "" && Number.isFinite(Number(hourlyRate)) ? (
                              <span className="text-2xl font-bold tracking-tight text-slate-900">
                                ${Number(hourlyRate)}
                                <span className="ml-1 text-sm font-medium text-slate-400">/hr</span>
                              </span>
                            ) : (
                              <span className="text-sm font-medium text-slate-500">See available sessions</span>
                            )}
                          </div>
                          <div className="grid grid-cols-[1fr_auto] gap-2">
                            <Link to={`/mentor/${mentor._id}`}>
                              <Button block size="large" className="!h-11 !rounded-xl !font-semibold">
                                View profile <ArrowRightOutlined />
                              </Button>
                            </Link>
                            <Link to={`/booking-page/${mentor._id}`}>
                              <Button
                                type="primary"
                                size="large"
                                aria-label={`Book a session with ${mentor.fullname}`}
                                className="!h-11 !w-12 !rounded-xl"
                                icon={<VideoCameraOutlined />}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
              </Card>
            </Col>
            );
          })
        ) : (
          <Col span={24}>
            <Empty description="No mentors found" />
          </Col>
        )}
      </Row>
    </div>
  );
}
