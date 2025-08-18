import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Form, Spin } from "antd";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import ServiceCard from "../../components/ServiceCard";
import apiService from "../../apiManager/service";
import { useSelector } from "react-redux";

const MentorServices = () => {
  const [services, setServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingService) {
      form.setFieldsValue(editingService);
    } else {
      form.resetFields();
    }
  }, [editingService, form]);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        if (!user?._id) {
          toast.error("Mentor ID is missing. Please login again.");
          return;
        }
        const response = await apiService.getServicesByMentor(user._id);
        setServices(response?.data?.services || []);
      } catch (error) {
        toast.error("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) {
      fetchServices();
    }
  }, [user]);

  const handleCreateService = async (values) => {
    setLoading(true);
    try {
      const response = await apiService.createService(values);
      setServices((prev) => [...prev, response?.data?.service]);
      setIsModalVisible(false);
      form.resetFields();
      toast.success("Service created successfully!");
    } catch {
      toast.error("Failed to create service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = async (values) => {
    setLoading(true);
    try {
      const response = await apiService.editService(editingService._id, values);
      setServices((prev) =>
        prev.map((svc) =>
          svc._id === editingService._id ? response.data.service : svc
        )
      );
      setIsModalVisible(false);
      setEditingService(null);
      form.resetFields();
      toast.success("Service updated successfully!");
    } catch {
      toast.error("Failed to update service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    if (!service.active) {
      toast.error("You cannot edit a disabled service.");
      return;
    }
    setEditingService(service);
    setIsModalVisible(true);
  };

  const handleToggleActive = async (service) => {
    setLoading(true);
    try {
      const response = await apiService.editService(service._id, {
        active: !service.active,
      });
      setServices((prev) =>
        prev.map((s) => (s._id === service._id ? response.data.service : s))
      );
      toast.success(
        `Service ${
          response.data.service.active ? "enabled" : "disabled"
        } successfully!`
      );
    } catch (error) {
      toast.error("Failed to update service status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Services</h2>
        <Button
          className="!rounded"
          type="primary"
          onClick={() => setIsModalVisible(true)}
        >
          <FiPlus className="inline-block mr-2" /> Add New
        </Button>
      </div>

      <Modal
        title={editingService ? "Edit Service" : "Create New Service"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingService(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={editingService ? handleEditService : handleCreateService}
          initialValues={editingService}
        >
          <Form.Item
            label="Service Name"
            name="serviceName"
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

      <Spin spinning={loading}>
        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {services?.map((svc) => (
            <ServiceCard
              key={svc._id}
              service={svc}
              onEdit={() => handleEdit(svc)}
              onToggleActive={() => handleToggleActive(svc)}
            />
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default MentorServices;
