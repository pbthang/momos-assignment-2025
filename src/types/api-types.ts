export declare type NotionQueryResponse = {
    object: "list";
    results: Array<{
        parent:
            | {
                  type: "database_id";
                  database_id: string;
              }
            | {
                  type: "page_id";
                  page_id: string;
              }
            | {
                  type: "workspace";
                  workspace: true;
              };
        properties: Record<
            string,
            | {
                  type: "title";
                  title: Array<
                      | {
                            type: "text";
                            text: {
                                content: string;
                                link: {
                                    url: string;
                                } | null;
                            };
                            annotations: {
                                bold: boolean;
                                italic: boolean;
                                strikethrough: boolean;
                                underline: boolean;
                                code: boolean;
                                color:
                                    | "default"
                                    | "gray"
                                    | "brown"
                                    | "orange"
                                    | "yellow"
                                    | "green"
                                    | "blue"
                                    | "purple"
                                    | "pink"
                                    | "red"
                                    | "gray_background"
                                    | "brown_background"
                                    | "orange_background"
                                    | "yellow_background"
                                    | "green_background"
                                    | "blue_background"
                                    | "purple_background"
                                    | "pink_background"
                                    | "red_background";
                            };
                            plain_text: string;
                            href: string | null;
                        }
                      | {
                            type: "mention";
                            mention:
                                | {
                                      type: "user";
                                      user:
                                          | {
                                                id: string;
                                                object: "user";
                                            }
                                          | {
                                                type: "person";
                                                person: {
                                                    email: string;
                                                };
                                                name: string | null;
                                                avatar_url: string | null;
                                                id: string;
                                                object: "user";
                                            }
                                          | {
                                                type: "bot";
                                                bot:
                                                    | Record<string, never>
                                                    | {
                                                          owner:
                                                              | {
                                                                    type: "user";
                                                                    user:
                                                                        | {
                                                                              type: "person";
                                                                              person: {
                                                                                  email: string;
                                                                              };
                                                                              name:
                                                                                  | string
                                                                                  | null;
                                                                              avatar_url:
                                                                                  | string
                                                                                  | null;
                                                                              id: string;
                                                                              object: "user";
                                                                          }
                                                                        | {
                                                                              id: string;
                                                                              object: "user";
                                                                          };
                                                                }
                                                              | {
                                                                    type: "workspace";
                                                                    workspace: true;
                                                                };
                                                      };
                                                name: string | null;
                                                avatar_url: string | null;
                                                id: string;
                                                object: "user";
                                            };
                                  }
                                | {
                                      type: "date";
                                      date: {
                                          start: string;
                                          end: string | null;
                                      };
                                  }
                                | {
                                      type: "link_preview";
                                      link_preview: {
                                          url: string;
                                      };
                                  }
                                | {
                                      type: "page";
                                      page: {
                                          id: string;
                                      };
                                  }
                                | {
                                      type: "database";
                                      database: {
                                          id: string;
                                      };
                                  };
                            annotations: {
                                bold: boolean;
                                italic: boolean;
                                strikethrough: boolean;
                                underline: boolean;
                                code: boolean;
                                color:
                                    | "default"
                                    | "gray"
                                    | "brown"
                                    | "orange"
                                    | "yellow"
                                    | "green"
                                    | "blue"
                                    | "purple"
                                    | "pink"
                                    | "red"
                                    | "gray_background"
                                    | "brown_background"
                                    | "orange_background"
                                    | "yellow_background"
                                    | "green_background"
                                    | "blue_background"
                                    | "purple_background"
                                    | "pink_background"
                                    | "red_background";
                            };
                            plain_text: string;
                            href: string | null;
                        }
                      | {
                            type: "equation";
                            equation: {
                                expression: string;
                            };
                            annotations: {
                                bold: boolean;
                                italic: boolean;
                                strikethrough: boolean;
                                underline: boolean;
                                code: boolean;
                                color:
                                    | "default"
                                    | "gray"
                                    | "brown"
                                    | "orange"
                                    | "yellow"
                                    | "green"
                                    | "blue"
                                    | "purple"
                                    | "pink"
                                    | "red"
                                    | "gray_background"
                                    | "brown_background"
                                    | "orange_background"
                                    | "yellow_background"
                                    | "green_background"
                                    | "blue_background"
                                    | "purple_background"
                                    | "pink_background"
                                    | "red_background";
                            };
                            plain_text: string;
                            href: string | null;
                        }
                  >;
                  id: string;
              }
            | {
                  type: "rich_text";
                  rich_text: Array<
                      | {
                            type: "text";
                            text: {
                                content: string;
                                link: {
                                    url: string;
                                } | null;
                            };
                            annotations: {
                                bold: boolean;
                                italic: boolean;
                                strikethrough: boolean;
                                underline: boolean;
                                code: boolean;
                                color:
                                    | "default"
                                    | "gray"
                                    | "brown"
                                    | "orange"
                                    | "yellow"
                                    | "green"
                                    | "blue"
                                    | "purple"
                                    | "pink"
                                    | "red"
                                    | "gray_background"
                                    | "brown_background"
                                    | "orange_background"
                                    | "yellow_background"
                                    | "green_background"
                                    | "blue_background"
                                    | "purple_background"
                                    | "pink_background"
                                    | "red_background";
                            };
                            plain_text: string;
                            href: string | null;
                        }
                      | {
                            type: "mention";
                            mention:
                                | {
                                      type: "user";
                                      user:
                                          | {
                                                id: string;
                                                object: "user";
                                            }
                                          | {
                                                type: "person";
                                                person: {
                                                    email: string;
                                                };
                                                name: string | null;
                                                avatar_url: string | null;
                                                id: string;
                                                object: "user";
                                            }
                                          | {
                                                type: "bot";
                                                bot:
                                                    | Record<string, never>
                                                    | {
                                                          owner:
                                                              | {
                                                                    type: "user";
                                                                    user:
                                                                        | {
                                                                              type: "person";
                                                                              person: {
                                                                                  email: string;
                                                                              };
                                                                              name:
                                                                                  | string
                                                                                  | null;
                                                                              avatar_url:
                                                                                  | string
                                                                                  | null;
                                                                              id: string;
                                                                              object: "user";
                                                                          }
                                                                        | {
                                                                              id: string;
                                                                              object: "user";
                                                                          };
                                                                }
                                                              | {
                                                                    type: "workspace";
                                                                    workspace: true;
                                                                };
                                                      };
                                                name: string | null;
                                                avatar_url: string | null;
                                                id: string;
                                                object: "user";
                                            };
                                  }
                                | {
                                      type: "date";
                                      date: {
                                          start: string;
                                          end: string | null;
                                      };
                                  }
                                | {
                                      type: "link_preview";
                                      link_preview: {
                                          url: string;
                                      };
                                  }
                                | {
                                      type: "page";
                                      page: {
                                          id: string;
                                      };
                                  }
                                | {
                                      type: "database";
                                      database: {
                                          id: string;
                                      };
                                  };
                            annotations: {
                                bold: boolean;
                                italic: boolean;
                                strikethrough: boolean;
                                underline: boolean;
                                code: boolean;
                                color:
                                    | "default"
                                    | "gray"
                                    | "brown"
                                    | "orange"
                                    | "yellow"
                                    | "green"
                                    | "blue"
                                    | "purple"
                                    | "pink"
                                    | "red"
                                    | "gray_background"
                                    | "brown_background"
                                    | "orange_background"
                                    | "yellow_background"
                                    | "green_background"
                                    | "blue_background"
                                    | "purple_background"
                                    | "pink_background"
                                    | "red_background";
                            };
                            plain_text: string;
                            href: string | null;
                        }
                      | {
                            type: "equation";
                            equation: {
                                expression: string;
                            };
                            annotations: {
                                bold: boolean;
                                italic: boolean;
                                strikethrough: boolean;
                                underline: boolean;
                                code: boolean;
                                color:
                                    | "default"
                                    | "gray"
                                    | "brown"
                                    | "orange"
                                    | "yellow"
                                    | "green"
                                    | "blue"
                                    | "purple"
                                    | "pink"
                                    | "red"
                                    | "gray_background"
                                    | "brown_background"
                                    | "orange_background"
                                    | "yellow_background"
                                    | "green_background"
                                    | "blue_background"
                                    | "purple_background"
                                    | "pink_background"
                                    | "red_background";
                            };
                            plain_text: string;
                            href: string | null;
                        }
                  >;
                  id: string;
              }
            | {
                  type: "number";
                  number: number | null;
                  id: string;
              }
            | {
                  type: "url";
                  url: string | null;
                  id: string;
              }
            | {
                  type: "select";
                  select: {
                      id: string;
                      name: string;
                      color:
                          | "default"
                          | "gray"
                          | "brown"
                          | "orange"
                          | "yellow"
                          | "green"
                          | "blue"
                          | "purple"
                          | "pink"
                          | "red";
                  } | null;
                  id: string;
              }
            | {
                  type: "multi_select";
                  multi_select: Array<{
                      id: string;
                      name: string;
                      color:
                          | "default"
                          | "gray"
                          | "brown"
                          | "orange"
                          | "yellow"
                          | "green"
                          | "blue"
                          | "purple"
                          | "pink"
                          | "red";
                  }>;
                  id: string;
              }
            | {
                  type: "people";
                  people: Array<
                      | {
                            id: string;
                            object: "user";
                        }
                      | {
                            type: "person";
                            person: {
                                email: string;
                            };
                            name: string | null;
                            avatar_url: string | null;
                            id: string;
                            object: "user";
                        }
                      | {
                            type: "bot";
                            bot:
                                | Record<string, never>
                                | {
                                      owner:
                                          | {
                                                type: "user";
                                                user:
                                                    | {
                                                          type: "person";
                                                          person: {
                                                              email: string;
                                                          };
                                                          name: string | null;
                                                          avatar_url:
                                                              | string
                                                              | null;
                                                          id: string;
                                                          object: "user";
                                                      }
                                                    | {
                                                          id: string;
                                                          object: "user";
                                                      };
                                            }
                                          | {
                                                type: "workspace";
                                                workspace: true;
                                            };
                                  };
                            name: string | null;
                            avatar_url: string | null;
                            id: string;
                            object: "user";
                        }
                  >;
                  id: string;
              }
            | {
                  type: "email";
                  email: string | null;
                  id: string;
              }
            | {
                  type: "phone_number";
                  phone_number: string | null;
                  id: string;
              }
            | {
                  type: "date";
                  date: {
                      start: string;
                      end: string | null;
                  } | null;
                  id: string;
              }
            | {
                  type: "files";
                  files: Array<
                      | {
                            file: {
                                url: string;
                                expiry_time: string;
                            };
                            name: string;
                            type?: "file";
                        }
                      | {
                            external: {
                                url: string;
                            };
                            name: string;
                            type?: "external";
                        }
                  >;
                  id: string;
              }
            | {
                  type: "checkbox";
                  checkbox: boolean;
                  id: string;
              }
            | {
                  type: "formula";
                  formula:
                      | {
                            type: "string";
                            string: string | null;
                        }
                      | {
                            type: "date";
                            date: {
                                start: string;
                                end: string | null;
                            } | null;
                        }
                      | {
                            type: "number";
                            number: number | null;
                        }
                      | {
                            type: "boolean";
                            boolean: boolean | null;
                        };
                  id: string;
              }
            | {
                  type: "relation";
                  relation: Array<{
                      id: string;
                  }>;
                  id: string;
              }
            | {
                  type: "created_time";
                  created_time: string;
                  id: string;
              }
            | {
                  type: "created_by";
                  created_by:
                      | {
                            id: string;
                            object: "user";
                        }
                      | {
                            type: "person";
                            person: {
                                email: string;
                            };
                            name: string | null;
                            avatar_url: string | null;
                            id: string;
                            object: "user";
                        }
                      | {
                            type: "bot";
                            bot:
                                | Record<string, never>
                                | {
                                      owner:
                                          | {
                                                type: "user";
                                                user:
                                                    | {
                                                          type: "person";
                                                          person: {
                                                              email: string;
                                                          };
                                                          name: string | null;
                                                          avatar_url:
                                                              | string
                                                              | null;
                                                          id: string;
                                                          object: "user";
                                                      }
                                                    | {
                                                          id: string;
                                                          object: "user";
                                                      };
                                            }
                                          | {
                                                type: "workspace";
                                                workspace: true;
                                            };
                                  };
                            name: string | null;
                            avatar_url: string | null;
                            id: string;
                            object: "user";
                        };
                  id: string;
              }
            | {
                  type: "last_edited_time";
                  last_edited_time: string;
                  id: string;
              }
            | {
                  type: "last_edited_by";
                  last_edited_by:
                      | {
                            id: string;
                            object: "user";
                        }
                      | {
                            type: "person";
                            person: {
                                email: string;
                            };
                            name: string | null;
                            avatar_url: string | null;
                            id: string;
                            object: "user";
                        }
                      | {
                            type: "bot";
                            bot:
                                | Record<string, never>
                                | {
                                      owner:
                                          | {
                                                type: "user";
                                                user:
                                                    | {
                                                          type: "person";
                                                          person: {
                                                              email: string;
                                                          };
                                                          name: string | null;
                                                          avatar_url:
                                                              | string
                                                              | null;
                                                          id: string;
                                                          object: "user";
                                                      }
                                                    | {
                                                          id: string;
                                                          object: "user";
                                                      };
                                            }
                                          | {
                                                type: "workspace";
                                                workspace: true;
                                            };
                                  };
                            name: string | null;
                            avatar_url: string | null;
                            id: string;
                            object: "user";
                        };
                  id: string;
              }
            | {
                  type: "rollup";
                  rollup:
                      | {
                            type: "number";
                            number: number | null;
                            function:
                                | "count"
                                | "count_values"
                                | "empty"
                                | "not_empty"
                                | "unique"
                                | "show_unique"
                                | "percent_empty"
                                | "percent_not_empty"
                                | "sum"
                                | "average"
                                | "median"
                                | "min"
                                | "max"
                                | "range"
                                | "earliest_date"
                                | "latest_date"
                                | "date_range"
                                | "checked"
                                | "unchecked"
                                | "percent_checked"
                                | "percent_unchecked"
                                | "show_original";
                        }
                      | {
                            type: "date";
                            date: {
                                start: string;
                                end: string | null;
                            } | null;
                            function:
                                | "count"
                                | "count_values"
                                | "empty"
                                | "not_empty"
                                | "unique"
                                | "show_unique"
                                | "percent_empty"
                                | "percent_not_empty"
                                | "sum"
                                | "average"
                                | "median"
                                | "min"
                                | "max"
                                | "range"
                                | "earliest_date"
                                | "latest_date"
                                | "date_range"
                                | "checked"
                                | "unchecked"
                                | "percent_checked"
                                | "percent_unchecked"
                                | "show_original";
                        }
                      | {
                            type: "array";
                            array: Array<
                                | {
                                      type: "title";
                                      title: Array<
                                          | {
                                                type: "text";
                                                text: {
                                                    content: string;
                                                    link: {
                                                        url: string;
                                                    } | null;
                                                };
                                                annotations: {
                                                    bold: boolean;
                                                    italic: boolean;
                                                    strikethrough: boolean;
                                                    underline: boolean;
                                                    code: boolean;
                                                    color:
                                                        | "default"
                                                        | "gray"
                                                        | "brown"
                                                        | "orange"
                                                        | "yellow"
                                                        | "green"
                                                        | "blue"
                                                        | "purple"
                                                        | "pink"
                                                        | "red"
                                                        | "gray_background"
                                                        | "brown_background"
                                                        | "orange_background"
                                                        | "yellow_background"
                                                        | "green_background"
                                                        | "blue_background"
                                                        | "purple_background"
                                                        | "pink_background"
                                                        | "red_background";
                                                };
                                                plain_text: string;
                                                href: string | null;
                                            }
                                          | {
                                                type: "mention";
                                                mention:
                                                    | {
                                                          type: "user";
                                                          user:
                                                              | {
                                                                    id: string;
                                                                    object: "user";
                                                                }
                                                              | {
                                                                    type: "person";
                                                                    person: {
                                                                        email: string;
                                                                    };
                                                                    name:
                                                                        | string
                                                                        | null;
                                                                    avatar_url:
                                                                        | string
                                                                        | null;
                                                                    id: string;
                                                                    object: "user";
                                                                }
                                                              | {
                                                                    type: "bot";
                                                                    bot:
                                                                        | Record<
                                                                              string,
                                                                              never
                                                                          >
                                                                        | {
                                                                              owner:
                                                                                  | {
                                                                                        type: "user";
                                                                                        user:
                                                                                            | {
                                                                                                  type: "person";
                                                                                                  person: {
                                                                                                      email: string;
                                                                                                  };
                                                                                                  name:
                                                                                                      | string
                                                                                                      | null;
                                                                                                  avatar_url:
                                                                                                      | string
                                                                                                      | null;
                                                                                                  id: string;
                                                                                                  object: "user";
                                                                                              }
                                                                                            | {
                                                                                                  id: string;
                                                                                                  object: "user";
                                                                                              };
                                                                                    }
                                                                                  | {
                                                                                        type: "workspace";
                                                                                        workspace: true;
                                                                                    };
                                                                          };
                                                                    name:
                                                                        | string
                                                                        | null;
                                                                    avatar_url:
                                                                        | string
                                                                        | null;
                                                                    id: string;
                                                                    object: "user";
                                                                };
                                                      }
                                                    | {
                                                          type: "date";
                                                          date: {
                                                              start: string;
                                                              end:
                                                                  | string
                                                                  | null;
                                                          };
                                                      }
                                                    | {
                                                          type: "link_preview";
                                                          link_preview: {
                                                              url: string;
                                                          };
                                                      }
                                                    | {
                                                          type: "page";
                                                          page: {
                                                              id: string;
                                                          };
                                                      }
                                                    | {
                                                          type: "database";
                                                          database: {
                                                              id: string;
                                                          };
                                                      };
                                                annotations: {
                                                    bold: boolean;
                                                    italic: boolean;
                                                    strikethrough: boolean;
                                                    underline: boolean;
                                                    code: boolean;
                                                    color:
                                                        | "default"
                                                        | "gray"
                                                        | "brown"
                                                        | "orange"
                                                        | "yellow"
                                                        | "green"
                                                        | "blue"
                                                        | "purple"
                                                        | "pink"
                                                        | "red"
                                                        | "gray_background"
                                                        | "brown_background"
                                                        | "orange_background"
                                                        | "yellow_background"
                                                        | "green_background"
                                                        | "blue_background"
                                                        | "purple_background"
                                                        | "pink_background"
                                                        | "red_background";
                                                };
                                                plain_text: string;
                                                href: string | null;
                                            }
                                          | {
                                                type: "equation";
                                                equation: {
                                                    expression: string;
                                                };
                                                annotations: {
                                                    bold: boolean;
                                                    italic: boolean;
                                                    strikethrough: boolean;
                                                    underline: boolean;
                                                    code: boolean;
                                                    color:
                                                        | "default"
                                                        | "gray"
                                                        | "brown"
                                                        | "orange"
                                                        | "yellow"
                                                        | "green"
                                                        | "blue"
                                                        | "purple"
                                                        | "pink"
                                                        | "red"
                                                        | "gray_background"
                                                        | "brown_background"
                                                        | "orange_background"
                                                        | "yellow_background"
                                                        | "green_background"
                                                        | "blue_background"
                                                        | "purple_background"
                                                        | "pink_background"
                                                        | "red_background";
                                                };
                                                plain_text: string;
                                                href: string | null;
                                            }
                                      >;
                                  }
                                | {
                                      type: "rich_text";
                                      rich_text: Array<
                                          | {
                                                type: "text";
                                                text: {
                                                    content: string;
                                                    link: {
                                                        url: string;
                                                    } | null;
                                                };
                                                annotations: {
                                                    bold: boolean;
                                                    italic: boolean;
                                                    strikethrough: boolean;
                                                    underline: boolean;
                                                    code: boolean;
                                                    color:
                                                        | "default"
                                                        | "gray"
                                                        | "brown"
                                                        | "orange"
                                                        | "yellow"
                                                        | "green"
                                                        | "blue"
                                                        | "purple"
                                                        | "pink"
                                                        | "red"
                                                        | "gray_background"
                                                        | "brown_background"
                                                        | "orange_background"
                                                        | "yellow_background"
                                                        | "green_background"
                                                        | "blue_background"
                                                        | "purple_background"
                                                        | "pink_background"
                                                        | "red_background";
                                                };
                                                plain_text: string;
                                                href: string | null;
                                            }
                                          | {
                                                type: "mention";
                                                mention:
                                                    | {
                                                          type: "user";
                                                          user:
                                                              | {
                                                                    id: string;
                                                                    object: "user";
                                                                }
                                                              | {
                                                                    type: "person";
                                                                    person: {
                                                                        email: string;
                                                                    };
                                                                    name:
                                                                        | string
                                                                        | null;
                                                                    avatar_url:
                                                                        | string
                                                                        | null;
                                                                    id: string;
                                                                    object: "user";
                                                                }
                                                              | {
                                                                    type: "bot";
                                                                    bot:
                                                                        | Record<
                                                                              string,
                                                                              never
                                                                          >
                                                                        | {
                                                                              owner:
                                                                                  | {
                                                                                        type: "user";
                                                                                        user:
                                                                                            | {
                                                                                                  type: "person";
                                                                                                  person: {
                                                                                                      email: string;
                                                                                                  };
                                                                                                  name:
                                                                                                      | string
                                                                                                      | null;
                                                                                                  avatar_url:
                                                                                                      | string
                                                                                                      | null;
                                                                                                  id: string;
                                                                                                  object: "user";
                                                                                              }
                                                                                            | {
                                                                                                  id: string;
                                                                                                  object: "user";
                                                                                              };
                                                                                    }
                                                                                  | {
                                                                                        type: "workspace";
                                                                                        workspace: true;
                                                                                    };
                                                                          };
                                                                    name:
                                                                        | string
                                                                        | null;
                                                                    avatar_url:
                                                                        | string
                                                                        | null;
                                                                    id: string;
                                                                    object: "user";
                                                                };
                                                      }
                                                    | {
                                                          type: "date";
                                                          date: {
                                                              start: string;
                                                              end:
                                                                  | string
                                                                  | null;
                                                          };
                                                      }
                                                    | {
                                                          type: "link_preview";
                                                          link_preview: {
                                                              url: string;
                                                          };
                                                      }
                                                    | {
                                                          type: "page";
                                                          page: {
                                                              id: string;
                                                          };
                                                      }
                                                    | {
                                                          type: "database";
                                                          database: {
                                                              id: string;
                                                          };
                                                      };
                                                annotations: {
                                                    bold: boolean;
                                                    italic: boolean;
                                                    strikethrough: boolean;
                                                    underline: boolean;
                                                    code: boolean;
                                                    color:
                                                        | "default"
                                                        | "gray"
                                                        | "brown"
                                                        | "orange"
                                                        | "yellow"
                                                        | "green"
                                                        | "blue"
                                                        | "purple"
                                                        | "pink"
                                                        | "red"
                                                        | "gray_background"
                                                        | "brown_background"
                                                        | "orange_background"
                                                        | "yellow_background"
                                                        | "green_background"
                                                        | "blue_background"
                                                        | "purple_background"
                                                        | "pink_background"
                                                        | "red_background";
                                                };
                                                plain_text: string;
                                                href: string | null;
                                            }
                                          | {
                                                type: "equation";
                                                equation: {
                                                    expression: string;
                                                };
                                                annotations: {
                                                    bold: boolean;
                                                    italic: boolean;
                                                    strikethrough: boolean;
                                                    underline: boolean;
                                                    code: boolean;
                                                    color:
                                                        | "default"
                                                        | "gray"
                                                        | "brown"
                                                        | "orange"
                                                        | "yellow"
                                                        | "green"
                                                        | "blue"
                                                        | "purple"
                                                        | "pink"
                                                        | "red"
                                                        | "gray_background"
                                                        | "brown_background"
                                                        | "orange_background"
                                                        | "yellow_background"
                                                        | "green_background"
                                                        | "blue_background"
                                                        | "purple_background"
                                                        | "pink_background"
                                                        | "red_background";
                                                };
                                                plain_text: string;
                                                href: string | null;
                                            }
                                      >;
                                  }
                                | {
                                      type: "number";
                                      number: number | null;
                                  }
                                | {
                                      type: "url";
                                      url: string | null;
                                  }
                                | {
                                      type: "select";
                                      select: {
                                          id: string;
                                          name: string;
                                          color:
                                              | "default"
                                              | "gray"
                                              | "brown"
                                              | "orange"
                                              | "yellow"
                                              | "green"
                                              | "blue"
                                              | "purple"
                                              | "pink"
                                              | "red";
                                      } | null;
                                  }
                                | {
                                      type: "multi_select";
                                      multi_select: Array<{
                                          id: string;
                                          name: string;
                                          color:
                                              | "default"
                                              | "gray"
                                              | "brown"
                                              | "orange"
                                              | "yellow"
                                              | "green"
                                              | "blue"
                                              | "purple"
                                              | "pink"
                                              | "red";
                                      }>;
                                  }
                                | {
                                      type: "people";
                                      people: Array<
                                          | {
                                                id: string;
                                                object: "user";
                                            }
                                          | {
                                                type: "person";
                                                person: {
                                                    email: string;
                                                };
                                                name: string | null;
                                                avatar_url: string | null;
                                                id: string;
                                                object: "user";
                                            }
                                          | {
                                                type: "bot";
                                                bot:
                                                    | Record<string, never>
                                                    | {
                                                          owner:
                                                              | {
                                                                    type: "user";
                                                                    user:
                                                                        | {
                                                                              type: "person";
                                                                              person: {
                                                                                  email: string;
                                                                              };
                                                                              name:
                                                                                  | string
                                                                                  | null;
                                                                              avatar_url:
                                                                                  | string
                                                                                  | null;
                                                                              id: string;
                                                                              object: "user";
                                                                          }
                                                                        | {
                                                                              id: string;
                                                                              object: "user";
                                                                          };
                                                                }
                                                              | {
                                                                    type: "workspace";
                                                                    workspace: true;
                                                                };
                                                      };
                                                name: string | null;
                                                avatar_url: string | null;
                                                id: string;
                                                object: "user";
                                            }
                                      >;
                                  }
                                | {
                                      type: "email";
                                      email: string | null;
                                  }
                                | {
                                      type: "phone_number";
                                      phone_number: string | null;
                                  }
                                | {
                                      type: "date";
                                      date: {
                                          start: string;
                                          end: string | null;
                                      } | null;
                                  }
                                | {
                                      type: "files";
                                      files: Array<
                                          | {
                                                file: {
                                                    url: string;
                                                    expiry_time: string;
                                                };
                                                name: string;
                                                type?: "file";
                                            }
                                          | {
                                                external: {
                                                    url: string;
                                                };
                                                name: string;
                                                type?: "external";
                                            }
                                      >;
                                  }
                                | {
                                      type: "checkbox";
                                      checkbox: boolean;
                                  }
                                | {
                                      type: "formula";
                                      formula:
                                          | {
                                                type: "string";
                                                string: string | null;
                                            }
                                          | {
                                                type: "date";
                                                date: {
                                                    start: string;
                                                    end: string | null;
                                                } | null;
                                            }
                                          | {
                                                type: "number";
                                                number: number | null;
                                            }
                                          | {
                                                type: "boolean";
                                                boolean: boolean | null;
                                            };
                                  }
                                | {
                                      type: "relation";
                                      relation: Array<{
                                          id: string;
                                      }>;
                                  }
                                | {
                                      type: "created_time";
                                      created_time: string;
                                  }
                                | {
                                      type: "created_by";
                                      created_by:
                                          | {
                                                id: string;
                                                object: "user";
                                            }
                                          | {
                                                type: "person";
                                                person: {
                                                    email: string;
                                                };
                                                name: string | null;
                                                avatar_url: string | null;
                                                id: string;
                                                object: "user";
                                            }
                                          | {
                                                type: "bot";
                                                bot:
                                                    | Record<string, never>
                                                    | {
                                                          owner:
                                                              | {
                                                                    type: "user";
                                                                    user:
                                                                        | {
                                                                              type: "person";
                                                                              person: {
                                                                                  email: string;
                                                                              };
                                                                              name:
                                                                                  | string
                                                                                  | null;
                                                                              avatar_url:
                                                                                  | string
                                                                                  | null;
                                                                              id: string;
                                                                              object: "user";
                                                                          }
                                                                        | {
                                                                              id: string;
                                                                              object: "user";
                                                                          };
                                                                }
                                                              | {
                                                                    type: "workspace";
                                                                    workspace: true;
                                                                };
                                                      };
                                                name: string | null;
                                                avatar_url: string | null;
                                                id: string;
                                                object: "user";
                                            };
                                  }
                                | {
                                      type: "last_edited_time";
                                      last_edited_time: string;
                                  }
                                | {
                                      type: "last_edited_by";
                                      last_edited_by:
                                          | {
                                                id: string;
                                                object: "user";
                                            }
                                          | {
                                                type: "person";
                                                person: {
                                                    email: string;
                                                };
                                                name: string | null;
                                                avatar_url: string | null;
                                                id: string;
                                                object: "user";
                                            }
                                          | {
                                                type: "bot";
                                                bot:
                                                    | Record<string, never>
                                                    | {
                                                          owner:
                                                              | {
                                                                    type: "user";
                                                                    user:
                                                                        | {
                                                                              type: "person";
                                                                              person: {
                                                                                  email: string;
                                                                              };
                                                                              name:
                                                                                  | string
                                                                                  | null;
                                                                              avatar_url:
                                                                                  | string
                                                                                  | null;
                                                                              id: string;
                                                                              object: "user";
                                                                          }
                                                                        | {
                                                                              id: string;
                                                                              object: "user";
                                                                          };
                                                                }
                                                              | {
                                                                    type: "workspace";
                                                                    workspace: true;
                                                                };
                                                      };
                                                name: string | null;
                                                avatar_url: string | null;
                                                id: string;
                                                object: "user";
                                            };
                                  }
                            >;
                            function:
                                | "count"
                                | "count_values"
                                | "empty"
                                | "not_empty"
                                | "unique"
                                | "show_unique"
                                | "percent_empty"
                                | "percent_not_empty"
                                | "sum"
                                | "average"
                                | "median"
                                | "min"
                                | "max"
                                | "range"
                                | "earliest_date"
                                | "latest_date"
                                | "date_range"
                                | "checked"
                                | "unchecked"
                                | "percent_checked"
                                | "percent_unchecked"
                                | "show_original";
                        }
                      | {
                            type: "unsupported";
                            unsupported: Record<string, never>;
                            function:
                                | "count"
                                | "count_values"
                                | "empty"
                                | "not_empty"
                                | "unique"
                                | "show_unique"
                                | "percent_empty"
                                | "percent_not_empty"
                                | "sum"
                                | "average"
                                | "median"
                                | "min"
                                | "max"
                                | "range"
                                | "earliest_date"
                                | "latest_date"
                                | "date_range"
                                | "checked"
                                | "unchecked"
                                | "percent_checked"
                                | "percent_unchecked"
                                | "show_original";
                        };
                  id: string;
              }
            | {
                  type: "status";
                  status: {
                      id: string;
                      name: string;
                      color:
                          | "default"
                          | "gray"
                          | "brown"
                          | "orange"
                          | "yellow"
                          | "green"
                          | "blue"
                          | "purple"
                          | "pink"
                          | "red";
                  } | null;
              }
        >;
        icon:
            | {
                  type: "emoji";
                  emoji: string;
              }
            | null
            | {
                  type: "external";
                  external: {
                      url: string;
                  };
              }
            | null
            | {
                  type: "file";
                  file: {
                      url: string;
                      expiry_time: string;
                  };
              }
            | null;
        cover:
            | {
                  type: "external";
                  external: {
                      url: string;
                  };
              }
            | null
            | {
                  type: "file";
                  file: {
                      url: string;
                      expiry_time: string;
                  };
              }
            | null;
        object: "page";
        id: string;
        created_time: string;
        last_edited_time: string;
        archived: boolean;
        url: string;
    }>;
    next_cursor: string | null;
    has_more: boolean;
};
