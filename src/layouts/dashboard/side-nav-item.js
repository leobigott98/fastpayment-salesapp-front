import { useState, useEffect } from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, ButtonBase, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { usePathname } from 'next/navigation';

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title, options } = props;
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : options
      ? options.map((option) => {
          return {
            component: NextLink,
            href: option.path,
          };
        })
      : {
          component: NextLink,
          href: path,
        }
    : {};

  return (
    <li>
      {!options ? (
        <ButtonBase
          sx={{
            alignItems: "center",
            borderRadius: 1,
            display: "flex",
            justifyContent: "flex-start",
            pl: "16px",
            pr: "16px",
            py: "6px",
            textAlign: "left",
            width: "100%",
            ...(active && {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            }),
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            },
          }}
          {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: "center",
                color: "neutral.400",
                display: "inline-flex",
                justifyContent: "center",
                mr: 2,
                ...(active && {
                  color: "primary.icon",
                }),
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              color: "neutral.400",
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "24px",
              whiteSpace: "nowrap",
              ...(active && {
                color: "common.white",
              }),
              ...(disabled && {
                color: "neutral.500",
              }),
            }}
          >
            {title}
          </Box>
        </ButtonBase>
      ) : (
        <Box sx={{ display: "block" }}>
          <Box
            sx={{
              alignItems: "center",
              borderRadius: 1,
              display: "flex",
              justifyContent: "flex-start",
              pl: "16px",
              pr: "16px",
              py: "6px",
              textAlign: "left",
              width: "100%",
              ...(pathname.includes(path) && {
                backgroundColor: "rgba(255, 255, 255, 0.04)",
              }),
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.04)",
              },
            }}
          >
            {icon && (
              <Box
                component="span"
                sx={{
                  alignItems: "center",
                  color: "neutral.400",
                  display: "inline-flex",
                  justifyContent: "center",
                  mr: 2,
                  ...(pathname.includes(path) && {
                    color: "primary.icon",
                  }),
                }}
              >
                {icon}
              </Box>
            )}
            <Box
              component="span"
              sx={{
                color: "neutral.400",
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                textOverflow: "ellipsis",
                overflow: "hidden",
                fontSize: 14,
                fontWeight: 600,
                lineHeight: "24px",
                whiteSpace: "nowrap",
                ...(pathname.includes(path) && {
                  color: "common.white",
                }),
                ...(disabled && {
                  color: "neutral.500",
                }),
              }}
            >
              {title}
            </Box>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
          <Collapse
            in={open}
            timeout="auto"
            //collapsedSize={30}
            unmountOnExit
            //orientation="vertical"
          >
            {options.map((option, index) => {
              return (
                <ButtonBase
                  key={index}
                  sx={{
                    alignItems: "center",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    pl: "16px",
                    pr: "16px",
                    py: "6px",
                    textAlign: "left",
                    width: "100%",
                    ...(pathname === option.path && {
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                    }),
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                    },
                  }}
                  {...linkProps[index]}
                >
                  {icon && (
                    <Box
                      component="span"
                      sx={{
                        alignItems: "center",
                        color: "neutral.400",
                        display: "inline-flex",
                        justifyContent: "center",
                        mr: 2,
                        ...(pathname === option.path && {
                          color: "primary.icon",
                        }),
                      }}
                    >
                      {option.icon}
                    </Box>
                  )}
                  <Box
                    component="span"
                    sx={{
                      color: "neutral.400",
                      flexGrow: 1,
                      fontFamily: (theme) => theme.typography.fontFamily,
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: "24px",
                      whiteSpace: "nowrap",
                      ...(pathname === option.path && {
                        color: "common.white",
                      }),
                      ...(disabled && {
                        color: "neutral.500",
                      }),
                    }}
                  >
                    {option.title}
                  </Box>
                </ButtonBase>
              );
            })}
          </Collapse>
        </Box>
      )}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
