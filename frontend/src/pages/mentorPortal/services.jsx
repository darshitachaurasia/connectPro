import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import ServiceCard from "../../components/ServiceCard";
import service from "../../apiManager/service";
import { Button, Input, Modal, Form, Spin } from "antd";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";

const Services = () => {
  const [services, setServices] = useState([]);  // State to hold services
  const [isModalVisible, setIsModalVisible] = useState(false);  // State for modal visibility
  const [editingService, setEditingService] = useState(null);  // State to track which service is being edited
  const [loading, setLoading] = useState(true);  // State to track loading status

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Assuming you have a way to get the logged-in mentor's ID
        const mentorId = "your-mentor-id"; // Replace with the actual way to get the mentor's ID
  
        if (!mentorId) {
          toast.error("Mentor ID is missing. Please login again.");
          return;
        }
  
        const response = await service.getServicesByMentor(mentorId);  // Pass the mentor ID to the API
        setServices(response?.data?.services || []);  // Update services state with fetched services
      } catch (error) {
        // console.error("Error fetching mentor services:", error);
        // toast.error("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);  // Set loading to false after the request completes
      }
    };
  
    fetchServices();
  }, []);  // Empty dependency array ensures this effect runs once when the component mounts
   // Empty dependency array ensures this effect runs once when the component mounts

  // Handle creating a new service
  const handleCreateService = async (values) => {
    setLoading(true);
    try {
      const response = await service.createService(values);  // Create new service through API call
      setServices((prevServices) => [...prevServices, response?.data?.service]);  // Update the services list
      setIsModalVisible(false);  // Close modal after creation
      toast.success("Service created successfully!");
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Failed to create service. Please try again.");
    } finally {
      setLoading(false);  // Set loading to false after the request completes
    }
  };

  // Handle editing an existing service
  const handleEditService = async (values) => {
    setLoading(true);
    try {
      const response = await service.editService(editingService._id, values);  // Edit service through API call
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === editingService._id ? response.data.service : service  // Update edited service
        )
      );
      setIsModalVisible(false);  // Close modal after edit
      setEditingService(null);  // Clear editing service
      toast.success("Service updated successfully!");
    } catch (error) {
      console.error("Error editing service:", error);
      toast.error("Failed to update service. Please try again.");
    } finally {
      setLoading(false);  // Set loading to false after the request completes
    }
  };

  // Handle opening the modal for editing a service
  const handleEdit = (service) => {
    setEditingService(service);  // Set the service to be edited
    setIsModalVisible(true);  // Open modal
  };

  return (
    <Dashboard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Services</h2>
          <Button
            className="!rounded"
            type="primary"
            onClick={() => setIsModalVisible(true)}  // Open modal for creating a new service
          >
            <FiPlus className="inline-block mr-2" /> Add New
          </Button>
        </div>

        {/* Modal for creating or editing services */}
        <Modal
          title={editingService ? "Edit Service" : "Create New Service"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);  // Close modal
            setEditingService(null);  // Clear editing service
          }}
          footer={null}
        >
          <Form
            onFinish={editingService ? handleEditService : handleCreateService}
            initialValues={editingService}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the service name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter the service description!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: "Please enter the service duration!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter the service price!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              {editingService ? "Save Changes" : "Create Service"}
            </Button>
          </Form>
        </Modal>

        {/* Spinner to show loading status */}
        <Spin spinning={loading}>
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Display the list of services */}
            {services?.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onEdit={() => handleEdit(service)}  // Pass service to edit function
              />
            ))}
          </div>
        </Spin>
      </div>
    </Dashboard>
  );
};

export default Services;
