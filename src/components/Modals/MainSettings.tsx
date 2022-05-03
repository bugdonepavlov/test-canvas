import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Container,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { MainAppContext } from "components/Main";
import { ActionKind } from "components/Main/reducers";

const CustomField = ({ name, label }: any) => (
  <Field name={name}>
    {({ field, form }: any) => (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input {...field} placeholder={name} id={name} type="number" />
      </FormControl>
    )}
  </Field>
);

const MainSettings = () => {
  const { state, dispatch } = useContext(MainAppContext);
  const { card, line } = state;

  return (
    <Container
      position="fixed"
      top="40px"
      bottom="40px"
      right="20px"
      width="240"
      background="#fff"
    >
      <Formik
        initialValues={{ card: card, line: line }}
        onSubmit={(values) => {
          dispatch({ type: ActionKind.CHANGE, payload: values });
        }}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            <Heading marginBottom="24px">Main settings</Heading>

            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Cards settings
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <CustomField name="card.width" label="Width card" />
                  </Box>
                  <Box>
                    <CustomField name="card.height" label="Width height" />
                  </Box>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Line settings
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box>
                    <CustomField name="line.width" label="Line width" />
                  </Box>
                  <Box>
                    <CustomField name="line.color" label="Line color" />
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default MainSettings;
