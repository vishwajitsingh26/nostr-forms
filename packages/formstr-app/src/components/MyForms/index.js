import { Card, Typography, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  constructDraftUrl,
  constructFormUrl,
  constructResponseUrl,
} from "../../utils/utility";
import { MyFormTabsList, MyFormTab } from "../../constants";
import { DeleteFilled, EditFilled, ShareAltOutlined } from "@ant-design/icons";

const MyForms = () => {
  const [tableForms, setTableForms] = useState(null);
  const [formDrafts, setFormDrafts] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState({});
  const [activeTab, setActiveTab] = useState(MyFormTab.drafts);
  const [shareDraft, setShareDraft] = useState(null);
  const { Text, Title } = Typography;

  function handleTabChange(key) {
    setActiveTab(key);
  }

  function handleDraftDelete(index) {
    let drafts = [...formDrafts];
    drafts = drafts.filter((_, ind) => ind !== index);
    localStorage.setItem("formstr:drafts", JSON.stringify(drafts));
    setFormDrafts(drafts);
  }

  useEffect(() => {
    let forms = localStorage.getItem("formstr:forms");
    let drafts = localStorage.getItem("formstr:drafts");
    if (tableForms && formDrafts) {
      return;
    }
    if (forms) {
      forms = JSON.parse(forms);
    }
    if (drafts) {
      drafts = JSON.parse(drafts);
    }
    drafts = drafts || [];
    forms = forms || [];
    forms = forms
      .map((form, index) => {
        let formUrl = constructFormUrl(form.publicKey);
        let responseUrl = constructResponseUrl(form.privateKey);
        return {
          key: index,
          name: form.name,
          formUrl: <a href={formUrl}> {formUrl}</a>,
          responseUrl: <a href={responseUrl}> {responseUrl}</a>,
          createdAt: form.createdAt || new Date(),
          privateKey: form.privateKey,
        };
      })
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    if (!formDrafts) {
      setFormDrafts(drafts);
    }
    if (!tableForms) setTableForms(forms);
  }, [tableForms, formDrafts]);

  const gridStyle = {
    textAlign: "center",
    margin: "10px",
  };

  return (
    <div>
      <Card
        tabList={MyFormTabsList}
        activeTabKey={activeTab}
        onTabChange={handleTabChange}
      >
        {activeTab === MyFormTab.drafts && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            {(formDrafts || []).map((draft, index) => {
              return (
                <Card
                  title={draft.formSpec.name}
                  style={gridStyle}
                  type="inner"
                  key={draft.tempId}
                  extra={
                    <div style={{ display: "flex" }}>
                      <div
                        title="share"
                        style={{ marginLeft: "10px", marginBottom: "15px" }}
                      >
                        <Button
                          icon={<ShareAltOutlined />}
                          onClick={() => {
                            setIsShareModalOpen(true);
                            setShareDraft(draft);
                          }}
                          size="small"
                        />
                      </div>
                      <div title="edit" style={{ marginLeft: "10px" }}>
                        <Link
                          to="/forms/new"
                          state={{
                            formSpec: draft.formSpec,
                            tempId: draft.tempId,
                          }}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <EditFilled />
                        </Link>
                      </div>
                      <div title="delete" style={{ marginLeft: "10px" }}>
                        <DeleteFilled
                          onClick={() => handleDraftDelete(index)}
                        />
                      </div>
                    </div>
                  }
                >
                  {draft.formSpec.description || "No description"}
                </Card>
              );
            })}
            {!formDrafts && (
              <div>
                {" "}
                <Text>
                  Hi there! You don't have any drafts yet, click{" "}
                  <Link to="/forms/new">
                    {" "}
                    <Button>Here</Button>{" "}
                  </Link>{" "}
                  to create one!
                </Text>
              </div>
            )}
          </div>
        )}
        {activeTab === MyFormTab.savedForms && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            {(tableForms || []).map((form) => {
              return (
                <Card
                  title={form.name}
                  style={gridStyle}
                  onClick={() => {
                    setCurrentForm(form);
                    setIsModalOpen(true);
                  }}
                  hoverable={true}
                  type="inner"
                >
                  {new Date(form.createdAt).toDateString()}
                </Card>
              );
            })}
            {!tableForms && (
              <div>
                {" "}
                <Text>
                  Hi there! You don't have any forms yet, click{" "}
                  <Link to="/forms/new">
                    {" "}
                    <Button>Here</Button>{" "}
                  </Link>{" "}
                  to create one!
                </Text>
              </div>
            )}
          </div>
        )}
      </Card>
      <Modal
        title="Share Draft"
        open={isShareModalOpen}
        onCancel={() => {
          setIsShareModalOpen(false);
        }}
        onOk={() => {
          setIsShareModalOpen(false);
        }}
      >
        <a href={constructDraftUrl(shareDraft)}> {constructDraftUrl(window.btoa(JSON.stringify(shareDraft)))} </a>
      </Modal>
      <Modal
        title={currentForm.name}
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <ul>
          <li>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Title level={3}> Form Url </Title>
              {currentForm.formUrl}
            </div>
          </li>
          <li>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Title level={3}> Response Url </Title>
              {currentForm.responseUrl}
            </div>
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default MyForms;
