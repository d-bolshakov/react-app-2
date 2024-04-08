import { render, screen } from "@testing-library/react";
import { Sidebar } from "../components/ui/Sidebar";

beforeAll(() => {
  const overlayContainer = document.createElement("div");
  overlayContainer.id = "overlay";
  document.body.appendChild(overlayContainer);
});

describe(Sidebar, () => {
  it("sidebar should render when 'visible' prop is true", () => {
    const visible = true;
    const testContent = "test";
    const { getByText } = render(
      <Sidebar onClose={() => null} visible={visible}>
        {testContent}
      </Sidebar>
    );
    const renderedSidebar = getByText(testContent);
    expect(renderedSidebar).toBeDefined();
  });
  it("sidebar should not render when 'visible' prop is false", () => {
    const visible = false;
    const testContent = "test";
    render(
      <Sidebar onClose={() => null} visible={visible}>
        {testContent}
      </Sidebar>
    );
    const renderedSidebar = screen.queryByText(testContent);
    expect(renderedSidebar).toBeNull();
  });
  it("sidebar should have title if it is passed", () => {
    const visible = true;
    const testContent = "test";
    const title = "test-title";
    const { getByText } = render(
      <Sidebar onClose={() => null} visible={visible} title={title}>
        {testContent}
      </Sidebar>
    );
    const renderedSidebar = getByText(title);
    expect(renderedSidebar).toBeDefined();
  });
});
